FROM node:15 as build

# Create app directory
WORKDIR /usr/src/quantumbudget
ARG auth0_domain
ARG auth0_clientId
ARG auth0_callbackURL
ARG auth0_logoutURL
ARG backendAPI
ARG stripe_publicKey
ARG axiosTimeout
ARG fb_pixelId
ARG google_tagManager

ENV NEXT_PUBLIC_AUTH0_DOMAIN=$auth0_domain
ENV NEXT_PUBLIC_AUTH0_CLIENT_ID=$auth0_clientId
ENV NEXT_PUBLIC_AUTH0_CALLBACK_URL=$auth0_callbackURL
ENV NEXT_PUBLIC_AUTH0_LOGOUT_URL=$auth0_logoutURL
ENV NEXT_PUBLIC_BACKEND_API=$backendAPI
ENV NEXT_PUBLIC_STRIPE_PUBLIC_KEY=$stripe_publicKey
ENV NEXT_PUBLIC_AXIOS_TIMEOUT=$axiosTimeout
ENV NEXT_PUBLIC_FB_PIXEL_ID=$fb_pixelId
ENV NEXT_PUBLIC_GOOGLE_TAG_MANAGER=$google_tagManager

COPY package*.json ./

RUN npm ci

COPY . .
RUN npm run build

CMD [ "npm", "start" ]
EXPOSE 80
