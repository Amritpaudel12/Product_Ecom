// src/utils/localStorage.js

/**
 * Saves a user's cart to local storage.
 * @param {string} userEmail - The email of the currently logged-in user.
 * @param {Array<Object>} cartData - The array of cart items.
 */
export const saveUserCart = (userEmail, cartData) => {
    try {
        if (!userEmail) {
            console.error("User email is required to save the cart.");
            return;
        }

        // Create a unique key for the user's cart
        const cartKey = `cart_${userEmail}`;
        
        // Convert the cart data to a JSON string
        const serializedCart = JSON.stringify(cartData);

        // Save the serialized data to localStorage
        localStorage.setItem(cartKey, serializedCart);

        console.log(`Cart saved successfully for user: ${userEmail}`);
    } catch (error) {
        // Handle potential errors, e.g., if localStorage is not available
        console.error("Failed to save cart to local storage:", error);
    }
};

/**
 * Loads a user's cart from local storage.
 * @param {string} userEmail - The email of the user to load the cart for.
 * @returns {Array<Object> | null} The cart data, or null if not found.
 */
export const loadUserCart = (userEmail) => {
    try {
        if (!userEmail) {
            console.error("User email is required to load the cart.");
            return null;
        }

        const cartKey = `cart_${userEmail}`;

        // Get the serialized cart data from localStorage
        const serializedCart = localStorage.getItem(cartKey);

        if (serializedCart === null) {
            // No cart found for this user, return an empty array
            return [];
        }

        // Parse the JSON string back into a JavaScript object
        return JSON.parse(serializedCart);
    } catch (error) {
        // Handle potential errors during parsing
        console.error("Failed to load cart from local storage:", error);
        return null;
    }
};

/**
 * Clears the cart data for a specific user from local storage.
 * @param {string} userEmail - The email of the user whose cart should be cleared.
 */
export const clearUserCart = (userEmail) => {
    try {
        if (!userEmail) {
            console.error("User email is required to clear the cart.");
            return;
        }

        const cartKey = `cart_${userEmail}`;
        localStorage.removeItem(cartKey);

        console.log(`Cart cleared for user: ${userEmail}`);
    } catch (error) {
        console.error("Failed to clear cart from local storage:", error);
    }
};