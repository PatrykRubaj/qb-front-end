FROM mcr.microsoft.com/azure-storage/azurite
COPY . /src/azurite
WORKDIR /src/azurite

ENTRYPOINT [ "azurite", "--oauth", "basic", "--cert", "./cert.pem", "--key", "./cert.key", "--blobHost", "0.0.0.0", "--queueHost", "0.0.0.0" ]