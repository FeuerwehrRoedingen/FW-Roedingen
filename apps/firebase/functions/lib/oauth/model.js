import { PrismaClient } from '@prisma/client-oauth';
const database = new PrismaClient();
async function getAccessToken(accessToken) {
    const response = await database.token.findUnique({
        where: { accessToken: accessToken }
    });
    if (response) {
        const client = await database.client.findUnique({
            select: { grants: true },
            where: { id: response.clientId }
        });
        if (!client)
            return Promise.reject();
        return Promise.resolve({
            accessToken: response.accessToken,
            accessTokenExpiresAt: response.accessTokenExpiresAt,
            client: {
                id: response.clientId,
                grants: client.grants
            },
            user: {
                id: response.userId
            }
        });
    }
    return Promise.resolve(null);
}
async function getRefreshToken(refreshToken) {
    const response = await database.refreshToken.findUnique({
        where: { refreshToken: refreshToken }
    });
    if (response) {
        const client = await database.client.findUnique({
            select: { grants: true },
            where: { id: response.clientId }
        });
        if (!client)
            return Promise.reject();
        return Promise.resolve({
            refreshToken: response.refreshToken,
            refreshTokenExpiresAt: response.refreshTokenExpiresAt,
            client: {
                id: response.clientId,
                grants: client.grants
            },
            user: {
                id: response.userId
            }
        });
    }
    return Promise.resolve(null);
}
async function getAuthorizationCode(AuthorizationCode) {
    return new Promise(async function (resolve, reject) {
    });
}
async function getClient(clientId, clientSecret) {
    return new Promise(async function (resolve, reject) {
    });
}
async function getUser(user, password) {
    return new Promise(async function (resolve, reject) {
    });
}
async function getUserFromClient(client) {
    return new Promise(async function (resolve, reject) {
    });
}
async function saveToken(token, client, user) {
    return new Promise(async function (resolve, reject) {
    });
}
async function saveAuthorizationCode(code, client, user) {
    return new Promise(async function (resolve, reject) {
    });
}
async function revokeToken(refreshToken) {
    return new Promise(async function (resolve, reject) {
    });
}
async function revokeAuthorizationCode(authorizationCode) {
    return new Promise(async function (resolve, reject) {
    });
}
async function validateScope(user, client, scope) {
    return new Promise(async function (resolve, reject) {
    });
}
async function verifyScope(accessToken, scope) {
    return new Promise(async function (resolve, reject) {
    });
}
export const model = {
    model: {
        getAccessToken,
        getAuthorizationCode,
        getClient,
        getRefreshToken,
        getUser,
        getUserFromClient,
        saveAuthorizationCode,
        saveToken,
        revokeAuthorizationCode,
        revokeToken,
        validateScope,
        verifyScope
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvbW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHNCQUFzQixDQUFBO0FBRW5ELE1BQU0sUUFBUSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7QUFFcEMsS0FBSyxVQUFVLGNBQWMsQ0FDM0IsV0FBbUI7SUFFakIsTUFBTSxRQUFRLEdBQUcsTUFBTSxRQUFRLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQztRQUMvQyxLQUFLLEVBQUUsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFO0tBQ3BDLENBQUMsQ0FBQTtJQUNGLElBQUcsUUFBUSxFQUFDO1FBQ1YsTUFBTSxNQUFNLEdBQUcsTUFBTSxRQUFRLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztZQUM5QyxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ3hCLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxRQUFRLENBQUMsUUFBUSxFQUFFO1NBQ2pDLENBQUMsQ0FBQTtRQUNGLElBQUcsQ0FBQyxNQUFNO1lBQUUsT0FBTyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDcEMsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDO1lBQ3JCLFdBQVcsRUFBRSxRQUFRLENBQUMsV0FBVztZQUNqQyxvQkFBb0IsRUFBRSxRQUFRLENBQUMsb0JBQW9CO1lBQ25ELE1BQU0sRUFBRTtnQkFDTixFQUFFLEVBQUUsUUFBUSxDQUFDLFFBQVE7Z0JBQ3JCLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTTthQUN0QjtZQUNELElBQUksRUFBRTtnQkFDSixFQUFFLEVBQUUsUUFBUSxDQUFDLE1BQU07YUFDcEI7U0FDRixDQUFDLENBQUE7S0FDSDtJQUNELE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUNoQyxDQUFDO0FBQ0QsS0FBSyxVQUFVLGVBQWUsQ0FD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