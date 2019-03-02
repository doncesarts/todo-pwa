// const ITEMS_URL = "http://[YOUR LOCAL IP ADDRESS]:4567/items.json"
const ITEMS_URL = "http://localhost:4567/items.json";
// const ITEMS_URL = process.env.REACT_APP_ITEMS_URL;

export const postItem = async item => {
    const response = await fetch(ITEMS_URL, {
        method: "POST",
        body: JSON.stringify({ item }),
        headers: {
            "Content-Type": "application/json"
        }
    });
    return await response.json();
};

export const deleteItem = async itemId => {
    const response = await fetch(ITEMS_URL, {
        method: 'DELETE',
        body: JSON.stringify({ id: itemId }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return await response.json();
};

  export const fetchItems = async () => {
    const response = await fetch(ITEMS_URL);
      return await response.json();
  };

  

