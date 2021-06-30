FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443
ENV ASPNETCORE_ENVIRONMENT="Development"
ENV AzureWebJobsStorage="DefaultEndpointsProtocol=https;AccountName=devstoreaccount1;AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==;BlobEndpoint=https://azurite:5003/devstoreaccount1;QueueEndpoint=https://127.0.0.1:5004/devstoreaccount1;"
ENV AzureWebJobsMailchimpServiceQueue="DefaultEndpointsProtocol=https;AccountName=devstoreaccount1;AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==;QueueEndpoint=https://127.0.0.1:5004/devstoreaccount1;"
ENV MongoDBConnectionString="mongodb://mongodatabase:27017"
ENV MongoDBBudgetsCollectionName="Budgets"
ENV MongoDBDatabaseName="QuantumBudget"
ENV Auth0__Instance="https://quantumbudget-dev.eu.auth0.com/"
ENV Auth0__TenantId="common"
ENV Auth0__Audience="quantum-budget-api"
ENV Auth0__ClientId="7FBbT3YcBINHUGLJQW2tc9d5tr2ZyvR8"
ENV Auth0__ClientSecret="XLUR_O5MHkDH_OYrHQdw1RsZGENAlIQn7tx_Jg3dbKyGdENFAT1ORcgWoKRkbtMG"
ENV Stripe__Domain="http://localhost:5000"
ENV Stripe__PublicKey="pk_test_51HQqj5ARU7b93yerx9KyBfogIJt5AVfmWYYnY6UVqEkVZlRvk78nDAE9b0NdKiCBYxaH6SA2DJAnRBFP8YOqaPvm004cjscEwc"
ENV Stripe__SecretKey="sk_test_51HQqj5ARU7b93yersR5KDXaC8Ru5oSjH9Fi6IoLHIRqcxohXvRNBLDmEGcPCou2YBY6j5UGm4JFvOUZtp17d5aOr00IRXhoQvX"
ENV Stripe__WebhookSecret="whsec_g6pND8HOaUZaNpk0uUiUlTKzZP8LomW9"
ENV GoogleApiCredentials__ClientId="112843725386-64lks4iap9d4rq8a0gjaegfqn7l4eb1u.apps.googleusercontent.com"
ENV GoogleApiCredentials__ClientSecret="IpchuwGI1b_ICZFyGGR15O5e"
ENV Mailchimp__ApiUrl="https://us10.api.mailchimp.com/3.0"
ENV Mailchimp__ApiKey="d4d3bb05772d4dfb3387c0a193fef775-us10"
ENV Mailchimp__AudienceId="2b10af41f7"
ENV Mailchimp__MarketingPermissionIdForEmail="bcbcbcbc"

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
RUN ls -la
COPY ["QuantumBudget.API/QuantumBudget.API.csproj", "QuantumBudget.API/"]
RUN dotnet restore "QuantumBudget.API/QuantumBudget.API.csproj"
COPY . .
RUN ls -la
WORKDIR "/src/QuantumBudget.API"
RUN dotnet build "QuantumBudget.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "QuantumBudget.API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "QuantumBudget.API.dll"]
