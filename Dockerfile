# syntax=docker/dockerfile:1
ARG VOLTO_VERSION=18-yarn
FROM plone/frontend-builder:${VOLTO_VERSION}

ARG ADDON_NAME
ARG ADDON_PATH
ENV HOST="0.0.0.0"

COPY --chown=node:node ./ /app/src/addons/${ADDON_PATH}/

RUN /setupAddon
RUN yarn add jest-junit
RUN yarn install

ENTRYPOINT ["yarn"]
CMD ["start"]
