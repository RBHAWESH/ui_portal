export const Currency = {  
    getEmptyCurrency: () => {
        return {
          "id": 0,
          "name": "", 
          "symbol": "",
          "exchange_rate":"",
          "is_primary": false,
          "display_order": null,         
          "published": false,  
        };
      }
    }