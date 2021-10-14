'use strict';

(req, res) => {
    try {  
        res.send(req.body);
    }
    catch {
        res.send('bad response :(')
    }
    
}