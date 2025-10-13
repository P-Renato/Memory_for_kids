

export async function fetchCountries() {
    const countryCodes = ['ENG', 'GBR', 'FRA', 'BRA', 'CZE', 'ESP', 'JPN', 'DEU'];

    try {
        const response = await fetch(`https://restcountries.com/v3.1/alpha?codes=${countryCodes.join(',')}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching countries:', error);
    }
}