export const toggleWishlist = async ({
    contactId,
    relatedId,
    relatedCode,
    relatedType
}) => {
    const form_data = { contactId,relatedId,relatedCode,relatedType};
    const resp = await fetch('/api/wishlist/toggle',{
            method: 'POST',
            body: JSON.stringify(form_data),
            headers: {
                'content-type' : 'application/json'
            }
        }
    );

    return resp.data;
};

export const checkWishlist = async ({
    contactId,
    relatedId,
    relatedType
}) => {
    const form_data = { contactId,relatedId,relatedType };
    const resp = await fetch('/api/wishlist/check',{
            method: 'GET',
            body: JSON.stringify(form_data),
            headers: {
                'content-type' : 'application/json'
            }
        }
    );
    const data = await resp.json();
    if (!resp.ok) {
        throw new Error(data.error || 'Failed to create wishlist');
    }
    return data;
};

export const createWishlist = async ({
    contactId,
    relatedId,
    relatedCode,
    relatedType,
    wishlistType = 'Wishlist',
    notes = ''
}) => {
    const resp = await fetch('/api/wishlist/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            contact__c: contactId,
            related_To_Id__c: relatedId,
            related_To_Code__c: relatedCode,
            related_Type__c: relatedType,
            wishlist_Type__c: wishlistType,
            notes__c: notes
        })
    });

    const data = await resp.json();

    if (!resp.ok) {
        throw new Error(data.error || 'Failed to create wishlist');
    }
    return data;
};