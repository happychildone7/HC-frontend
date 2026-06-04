export const loginUser = async (email__c,password__c) => {
    const form_data = { email__c,password__c };
    const resp = await fetch('/api/auth/login/', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'content-type' : 'application/json'
        },
        body: JSON.stringify(form_data)
    });
    return resp;
};

export const loginWithGoogle = async (accessCode) => {
    const form_data = { accessCode };
    const resp = await fetch('/api/auth/googleLogin', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(form_data),
        headers: {
            'content-type': 'application/json'
        }
    });
    return resp;
};

export const loginWithFacebook = async (accessToken,userId) => {
    const form_data = { accessToken,userId };
    const resp = await fetch('/api/auth/facebookLogin', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(form_data),
        headers: {
            'content-type': 'application/json'
        }
    });
    return resp;
}

export const logoutUser = async () => {
    const resp = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'content-type' : 'application/json'
        }
    });
    return resp;
};