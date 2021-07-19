FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

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
