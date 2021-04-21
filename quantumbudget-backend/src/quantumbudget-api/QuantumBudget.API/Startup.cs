using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using QuantumBudget.API.Middleware;
using QuantumBudget.Model.Options;
using QuantumBudget.API.Policies;
using QuantumBudget.API.Validators;
using QuantumBudget.Model.DTOs.Auth0;
using QuantumBudget.Model.Mappers;
using QuantumBudget.Model.Models;
using QuantumBudget.Repositories;
using QuantumBudget.Repositories.Auth0;
using QuantumBudget.Repositories.HttpClients;
using QuantumBudget.Repositories.Stripe;
using QuantumBudget.Services;
using QuantumBudget.Services.Mailchimp;
using Stripe;

namespace QuantumBudget.API
{
    public class Startup
    {
        private readonly IWebHostEnvironment _env;
        private readonly string DevelopmentOrigins = "_developmentOrigins";
        private readonly string ProductionOrigins = "_productionOrigins";

        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            _env = env;
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<Auth0Configuration>(Configuration.GetSection(
                Auth0Configuration.Auth0));
            services.Configure<StripeOptions>(Configuration.GetSection(
                StripeOptions.Stripe));
            services.Configure<GoogleApiCredentials>(Configuration.GetSection(
                GoogleApiCredentials.GoogleApi));
            services.Configure<MailchimpConfiguration>(Configuration.GetSection(
                MailchimpConfiguration.Mailchimp));

            services.AddCors(options =>
            {
                options.AddPolicy(name: DevelopmentOrigins,
                    builder =>
                    {
                        builder.WithOrigins("http://localhost:5000")
                            .AllowAnyHeader();
                    });
                options.AddPolicy(name: ProductionOrigins,
                    builder =>
                    {
                        builder.WithOrigins("https://quantumbudget.com")
                            .AllowAnyHeader();
                    });
            });

            services.AddRouting(options =>
            {
                options.LowercaseUrls = true;
                options.LowercaseQueryStrings = true;
            });

            services.AddControllers().AddFluentValidation().ConfigureApiBehaviorOptions(setupAction =>
            {
                setupAction.InvalidModelStateResponseFactory = context =>
                {
                    var problemDetailsFactory =
                        context.HttpContext.RequestServices.GetRequiredService<ProblemDetailsFactory>();
                    var problemDetails =
                        problemDetailsFactory.CreateValidationProblemDetails(context.HttpContext, context.ModelState);

                    var actionExecutionContext = context as Microsoft.AspNetCore.Mvc.Filters.ActionExecutingContext;

                    if (context.ModelState.ErrorCount > 0 && actionExecutionContext?.ActionArguments.Count ==
                        context.ActionDescriptor.Parameters.Count)
                    {
                        problemDetails.Status = StatusCodes.Status422UnprocessableEntity;

                        return new UnprocessableEntityObjectResult(problemDetails)
                        {
                            ContentTypes = {"application/problem+json"}
                        };
                    }

                    problemDetails.Status = StatusCodes.Status400BadRequest;
                    return new BadRequestObjectResult(problemDetails)
                    {
                        ContentTypes = {"application/problem+json"}
                    };
                };
            });
            services.AddMvc()
                .AddFluentValidation(fv =>
                {
                    fv.RegisterValidatorsFromAssemblyContaining<BudgetDtoValidator>();
                    fv.RunDefaultMvcValidationAfterFluentValidationExecutes = false;
                });
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo {Title = "QuantumBudget.API", Version = "v1"});
                c.CustomSchemaIds(type => type.ToString());
            });

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.Authority = Configuration.GetValue<string>("Auth0:Instance");
                    options.RequireHttpsMetadata = true;
                    options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                    {
                        ValidateAudience = true,
                        ValidateIssuer = true,
                        ValidAudiences = new string[] {$"{Configuration.GetValue(typeof(string), "Auth0:Audience")}"},
                        NameClaimType = ClaimTypes.NameIdentifier
                    };
                });

            services.AddAuthorization(options =>
            {
                options.AddPolicy(Auth0Permissions.BudgetRead,
                    policy => policy.Requirements.Add(new HasPermissionRequirement(Auth0Permissions.BudgetRead,
                        Configuration.GetValue<string>("Auth0:Instance"))));
                options.AddPolicy(Auth0Permissions.BudgetWrite,
                    policy => policy.Requirements.Add(new HasPermissionRequirement(Auth0Permissions.BudgetWrite,
                        Configuration.GetValue<string>("Auth0:Instance"))));
                options.AddPolicy(Auth0Permissions.BudgetGenerate,
                    policy => policy.Requirements.Add(new HasPermissionRequirement(Auth0Permissions.BudgetGenerate,
                        Configuration.GetValue<string>("Auth0:Instance"))));
            });

            services.AddHttpClient();
            services.AddLogging();
            services.AddMemoryCache();

            services.AddHttpClient<Auth0Client>();
            services.AddHttpClient<MailchimpClient>();

            services.AddScoped<SubscriberService>();

            // First, add our service to the collection.
            services.AddScoped<IUserManagementService, UserManagementService>();
            // Finally, decorate UserManagementService with the CachedUserManagementService type.
            // As you can see, CachedUserManagementService requires a separate service, IMemoryCache. We can get that from the provider argument.
            services.Decorate<IUserManagementService>((inner, provider) =>
                new CachedUserManagementService(inner, provider.GetRequiredService<IMemoryCache>()));

            services.AddScoped<SpreadsheetGeneratingService>();
            services.AddScoped<GoogleSpreadsheetService>();
            services.AddScoped<IRoleRepository, RoleRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IUserInfoRepository, UserInfoRepository>();

            services.AddScoped<JwtToken>();
            services.AddSingleton<IAuthorizationHandler, HasPermissionHandler>();

            services.AddScoped<CustomerService>();
            services.AddScoped<Stripe.Checkout.SessionService>();
            services.AddScoped<Stripe.BillingPortal.SessionService>();
            services.AddScoped<StripeEventHandlerService>();
            services.AddScoped<StripePaymentService>();
            services.AddScoped<IStripeClient>(provider =>
                new StripeClient(Configuration.GetValue<string>("Stripe:SecretKey")));
            services.AddScoped<IMailchimpRepository, MailchimpRepository>();

            if (_env.IsProduction())
            {
                services.AddScoped<IPriceNameToIdMapper, ProdPriceNameToIdMapper>();
                services.AddScoped<IAuth0RoleMapper, ProdAuth0RoleMapper>();
            }
            else
            {
                services.AddScoped<IPriceNameToIdMapper, DevPriceNameToIdMapper>();
                services.AddScoped<IAuth0RoleMapper, DevAuth0RoleMapper>();
            }

            services.AddScoped<GoogleAuthService>();
            services.AddScoped<IStripeCustomerRepository, StripeCustomerRepository>();
            services.AddScoped<IStripeCheckoutSessionRepository, StripeCheckoutSessionRepository>();
            services.AddScoped<IStripeBillingPortalSessionRepository, StripeBillingPortalSessionRepository>();
            services.AddSingleton<IBudgetsDatabaseSettings>(GetMongoDBSettings());
            
            services.AddScoped<IStripePaymentService, StripePaymentService>();
            services.AddSingleton<IBudgetsService, BudgetsService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "QuantumBudget.API v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            if (env.IsDevelopment())
            {
                app.UseCors(DevelopmentOrigins);
            }
            else if (env.IsProduction())
            {
                app.UseCors(ProductionOrigins);
            }

            app.UseAuthentication();
            app.UseAuthorization();
            app.UseGetJwtToken();

            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }

        private BudgetsDatabaseSettings GetMongoDBSettings()
        {
            var databaseSettings = new BudgetsDatabaseSettings()
            {
                BudgetsCollectionName = Environment.GetEnvironmentVariable("MongoDBBudgetsCollectionName"),
                MongoDBConnectionString = Environment.GetEnvironmentVariable("MongoDBConnectionString"),
                DatabaseName = Environment.GetEnvironmentVariable("MongoDBDatabaseName"),
            };

            return databaseSettings;
        }
    }
}