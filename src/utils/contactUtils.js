export const getContactById = async (contactId) => {
    if (!contactId) {
        throw new Error('Contact Id is required');
    }

    const response = await fetch(`/api/contact/${contactId}`, {
        method: 'GET'
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch contact');
    }

    return data;
};