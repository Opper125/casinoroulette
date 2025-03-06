const serverless = require('serverless-http');

let users = {};

exports.handler = async (event, context) => {
    try {
        const { httpMethod, body, path } = event;
        const data = body ? JSON.parse(body) : {};

        if (httpMethod === 'GET' && path === '/.netlify/functions/data') {
            return {
                statusCode: 200,
                body: JSON.stringify(users),
            };
        }

        if (httpMethod === 'POST' && path === '/.netlify/functions/data') {
            const { phone, userData } = data;
            if (phone && userData) {
                users[phone] = { ...users[phone], ...userData, history: users[phone]?.history || [] };
                users[phone].history.push({ date: new Date().toISOString(), activity: `Updated: ${JSON.stringify(userData)}` });
                return {
                    statusCode: 200,
                    body: JSON.stringify({ message: 'User data updated', phone, userData }),
                };
            }
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Phone and userData are required' }),
            };
        }

        if (httpMethod === 'PUT' && path === '/.netlify/functions/data') {
            const { phone, balance } = data;
            if (phone && balance !== undefined) {
                if (users[phone]) {
                    users[phone].balance = balance;
                    users[phone].history.push({
                        date: new Date().toISOString(),
                        activity: `Balance updated to ${balance} MMK`,
                    });
                    return {
                        statusCode: 200,
                        body: JSON.stringify({ message: 'Balance updated', phone, balance }),
                    };
                }
                return {
                    statusCode: 404,
                    body: JSON.stringify({ message: 'User not found' }),
                };
            }
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Phone and balance are required' }),
            };
        }

        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method not allowed' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Server error', error: error.message }),
        };
    }
};
