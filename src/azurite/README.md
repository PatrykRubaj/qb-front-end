**Command to generate SSL certificate working inside docker and from withing windows (eg. with Microsoft Azure Storage Explorer)**

`openssl req -newkey rsa:2048 -x509 -nodes -keyout cert.key -new -out cert.pem -sha256 -days 365 -addext "subjectAltName=IP:127.0.0.1,DNS:azurite" -subj "/C=CO/ST=ST/L=LO/O=OR/OU=OU/CN=CN"`

---
