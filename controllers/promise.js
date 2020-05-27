   try {
      
       //Step 1: declare promise 
    var myPromise = () => {
        return new Promise((resolve, reject) => {
            
            //db.Users

        });
    };
    var myPromise2 = () => {
        return new Promise((resolve, reject) => {
            
            //db.Users

        });
    };
    
    //Step 2: async promise handler
    var callMyPromise = async () => {
        
        var result = await (myPromise());
        //anything here is executed after result is resolved
        return result;
    };
    var callMyPromise2 = async () => {
        
        var result2 = await (myPromise2());
        //anything here is executed after result is resolved
        return result2;
    };
    
    //Step 3: make the call
    callMyPromise().then(function(result) {
        res.json(result);
    });
    callMyPromise2().then(function(result2) {
        res.json(result2);
    });
      
   } catch (e) {
     next(e)
   }
