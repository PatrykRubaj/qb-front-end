FROM node:14 as build

# Create app directory
WORKDIR /usr/src/quantumbudget

COPY package*.json ./

RUN npm ci

COPY . .
RUN npm run build

CMD [ "npm", "start" ]
EXPOSE 80
# Create nginx server
# FROM nginx:stable

# COPY ./quantumbudget.txt /etc/ssl/private/quantumbudget-key.pem
# COPY ./quantumbudget-cert.txt /etc/ssl/certs/quantumbudget-cert.pem
#RUN openssl pkcs12 -in /etc/ssl/public.pfx -out /etc/ssl/certs/quantumbudget-cert.pem -cacerts -passin pass: -nodes && \
#    openssl pkcs12 -in /etc/ssl/private.pfx -out /etc/ssl/private/quantumbudget.key -nocerts -passin pass: -nodes

# COPY ./nginx.conf /etc/nginx/conf.d/default.conf
# RUN ls -la /etc/nginx/conf.d/
# COPY --from=build /usr/src/quantumbudget/build /usr/share/nginx/html
