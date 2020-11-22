FROM mcr.microsoft.com/azure-functions/dotnet:3.0-dotnet3-core-tools
COPY . /src/dotnet-function-app
COPY ./azurite/cert.pem /usr/local/share/ca-certificates/azurite.crt
RUN update-ca-certificates
WORKDIR /src/dotnet-function-app
ENTRYPOINT [ "func", "start", "--verbose" ]