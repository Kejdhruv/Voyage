const express = require("express");
const cors = require('cors');
const dbConnect1 = require("./database");
const dbConnect2 = require("./database2");
const dbConnect3 = require("./database3");
const dbConnect4 = require("./database4");
const dbConnect5 = require("./database5");
const dbConnect6 = require("./database6")
const dbConnect7 = require("./database7");
const dbConnect8 = require("./database8");
const dbConnect9 = require("./database9");
const dbConnect10 = require("./database10");
const dbConnect11 = require("./database11");
const dbConnect12 = require("./database12");
const dbConnect13 = require("./database13");
const dbConnect14 = require("./database14");
const dbConnect15 = require("./database15");
const dbConnect16 = require("./database16");
const dbConnect17 = require("./database17");
const dbConnect18 = require("./database18");
const dbConnect19 = require("./database19");
const dbConnect20 = require("./database20");
const dbConnect21 = require("./database21");
const dbConnect22 = require("./database22");
const dbConnect23 = require("./database23");
const dbConnect24 = require("./database24");
const dbConnect25 = require("./database25");
const dbConnect26 = require("./database26");
const dbConnect27 = require("./database27");
const dbConnect28 = require("./database28");
const dbConnect29 = require("./database29");
const dbConnect30 = require("./database30");
const dbConnect31 = require("./database31");
const dbConnect32 = require("./database32");
const dbConnect33 = require("./database33");
const dbConnect34 = require("./database34");
const dbConnect35 = require("./database35");
const dbConnect36 = require("./database36");
const dbConnect37 = require("./database37");
const PORT = 5601;

const app = express();
app.use(cors());
app.use(express.json()); 

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


app.get('/Hotels', async (req, res) => {
    try {
        const data = await dbConnect1(); 

        res.send(data);
    } catch (err) {
        console.error('Error fetching Hotel data:', err);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/Restaurants', async (req, res) => {
    try {
        const data = await dbConnect2(); 

        res.send(data);
    } catch (err) {
        console.error('Error fetching Restaurants data:', err);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/Hotels/:_id', async (req, res) => {
    try {
        const _id = req.params._id; 
        const data = await dbConnect3(_id); 

        if (data.length > 0) {
            res.json(data[0]); 
        } else {
            res.status(404).send('Hotel not found');
        }
    } catch (err) {
        console.error('Error fetching hotel data:', err);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/Restaurants/:_id', async (req, res) => {
    try {
        const _id = req.params._id; 
        const data = await dbConnect4(_id); 

        if (data.length > 0) {
            res.json(data[0]); 
        } else {
            res.status(404).send('Hotel not found');
        }
    } catch (err) {
        console.error('Error fetching hotel data:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/HotelOrders', async (req, res) => {
    try {
        const newData = req.body;

        
        if (!Array.isArray(newData)) {
            return res.status(400).send('Invalid input: data must be an array');
        }

        const result = await dbConnect5(newData);

        
        res.status(200).json({
            message: 'Items Added',
            insertedCount: result.insertedCount, 
            insertedIds: result.insertedIds 
        });
    } catch (err) {
        console.error('Error adding Hotel product:', err);
        res.status(500).send('Internal Server Error');
    }
});


app.post('/RestaurantsOrders', async (req, res) => {
    try {
        const newData = req.body;

        
        if (!Array.isArray(newData)) {
            return res.status(400).send('Invalid input: data must be an array');
        }

        const result = await dbConnect6(newData);

        
        res.status(200).json({
            message: 'Items Added',
            insertedCount: result.insertedCount, 
            insertedIds: result.insertedIds 
        });
    } catch (err) {
        console.error('Error adding Hotel product:', err);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/AdminUser', async (req, res) => {
    try {
        const data = await dbConnect7(); 

        res.send(data);
    } catch (err) {
        console.error('Error fetching Restaurants data:', err);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/Hotels/HID/:HID', async (req, res) => {
    try {
        const HID = req.params.HID; 
        const data = await dbConnect8(HID); 

        if (data.length === 0) {
            return res.status(404).send('No hotels found for the given HID');
        }

        res.send(data);
    } catch (err) {
        console.error('Error fetching Hotel data:', err);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/HotelOrders/:HID', async (req, res) => {
    try {
        const HID = req.params.HID; 
        const data = await dbConnect9(HID); 

        if (data.length === 0) {
            return res.status(404).send('No hotels found for the given HID');
        }

        res.send(data);
    } catch (err) {
        console.error('Error fetching Hotel data:', err);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/Restaurants/HID/:HID', async (req, res) => {
    try {
        const HID = req.params.HID; 
        const data = await dbConnect10(HID);

        if (data.length === 0) {
            return res.status(404).send('No hotels found for the given HID');
        }

        res.send(data);
    } catch (err) {
        console.error('Error fetching Hotel data:', err);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/RestaurantsOrders/:HID', async (req, res) => {
    try {
        const HID = req.params.HID; 
        const data = await dbConnect11(HID); 

        if (data.length === 0) {
            return res.status(404).send('No hotels found for the given HID');
        }

        res.send(data);
    } catch (err) {
        console.error('Error fetching Hotel data:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.delete('/Hotels/:_id', async (req, res) => {
    try {
      const _id = decodeURIComponent(req.params._id);
      const result = await dbConnect12(_id); 
      
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Item not found' });
      }
      res.status(200).json({ message: 'Item deleted' });
    } catch (err) {
      console.error('Error deleting item:', err);
      res.status(500).send('Internal Server Error');
    }
  });

  app.delete('/Restaurants/:_id', async (req, res) => {
    try {
      const _id = decodeURIComponent(req.params._id);
      const result = await dbConnect13(_id); 
      
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Item not found' });
      }
      res.status(200).json({ message: 'Item deleted' });
    } catch (err) {
      console.error('Error deleting item:', err);
      res.status(500).send('Internal Server Error');
    }
  });

  app.post('/Hotels', async (req, res) => {
    try {
        const newData = req.body;

        console.log(newData);

    
        if (typeof newData !== 'object' || Array.isArray(newData)) {
            return res.status(400).send('Invalid input: data must be a single object');
        }

        const result = await dbConnect14(newData);

        
        res.status(200).json({
            message: 'Hotel added successfully',
            insertedId: result.insertedId 
        });
    } catch (err) {
        console.error('Error adding Hotel:', err);
        res.status(500).send('Internal Server Error');
    }
});


app.post('/Restaurants', async (req, res) => {
    try {
        const newData = req.body;

        console.log(newData);

    
        if (typeof newData !== 'object' || Array.isArray(newData)) {
            return res.status(400).send('Invalid input: data must be a single object');
        }

        const result = await dbConnect15(newData);

        
        res.status(200).json({
            message: 'Hotel added successfully',
            insertedId: result.insertedId 
        });
    } catch (err) {
        console.error('Error adding Hotel:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/Guides', async (req, res) => {
    try {
        const data = await dbConnect16(); 

        res.send(data);
    } catch (err) {
        console.error('Error fetching Restaurants data:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/Guides/:_id', async (req, res) => {
    try {
        const _id = req.params._id; 
        const data = await dbConnect17(_id);

        if (data.length > 0) {
            res.json(data[0]);
        } else {
            res.status(404).send('Guide not found');
        }
    } catch (err) {
        console.error('Error fetching Guide data:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/GuideOrders', async (req, res) => {
    try {
        const newData = req.body;

        
        if (!Array.isArray(newData)) {
            return res.status(400).send('Invalid input: data must be an array');
        }

        const result = await dbConnect18(newData);


        res.status(200).json({
            message: 'Items Added' ,
            insertedCount: result.insertedCount, 
            insertedIds: result.insertedIds 
        });
    } catch (err) {
        console.error('Error adding Guide Orders:', err.message); 
        res.status(500).send('Internal Server Error');
    }
});
app.get('/GuideOrders/:HID', async (req, res) => {
    try {
        const GuideId = req.params.HID; 
        const data = await dbConnect19(GuideId); 

        if (data.length === 0) {
            return res.status(404).send('No hotels found for the given HID');
        }

        res.send(data);
    } catch (err) {
        console.error('Error fetching Hotel data:', err);
        res.status(500).send('Internal Server Error');
    }
}); 
app.get('/Guides/Profile/:contact', async (req, res) => {
    try {
        const contact = req.params.contact; 
        const data = await dbConnect20(contact);

        if (data.length > 0) {
            res.json(data[0]); 
        } else {
            res.status(404).send('Guide not found');
        }
    } catch (err) {
        console.error('Error fetching Guide data:', err);
        res.status(500).send('Internal Server Error');
    }
}); 
app.put('/Guides/Profile/:contact', async (req, res) => {
    const contact = req.params.contact;
    const newData = req.body;

    try {
        const result = await dbConnect21(contact, newData);
        
        if (result.matchedCount === 0) {
            return res.status(404).send('Guide not found');
        }

        res.status(200).json({
            message: 'Guide profile updated successfully',
            matchedCount: result.matchedCount,
            modifiedCount: result.modifiedCount
        });
    } catch (err) {
        console.error('Error updating guide profile:', err.message);
        res.status(500).send('Internal Server Error');
    }
});
app.post('/Guides', async (req, res) => {
    try {
        const newData = req.body;


        if (!Array.isArray(newData)) {
            return res.status(400).send('Invalid input: data must be an array');
        }

        const result = await dbConnect22(newData);

    
        res.status(200).json({
            message: 'Items Added',
            insertedCount: result.insertedCount, 
            insertedIds: result.insertedIds
        });
    } catch (err) {
        console.error('Error adding Hotel product:', err);
        res.status(500).send('Internal Server Error');
    }
});


app.post('/Register', async (req, res) => {
    try {
        const newData = req.body;

        
        if (!Array.isArray(newData)) {
            return res.status(400).send('Invalid input: data must be an array');
        }

        const result = await dbConnect23(newData);

        
        res.status(200).json({
            message: 'Items Added',
            insertedCount: result.insertedCount, 
            insertedIds: result.insertedIds 
        });
    } catch (err) {
        console.error('Error adding Hotel product:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/Register/User', async (req, res) => {
    try {
        const newData = req.body;

        
        if (!Array.isArray(newData)) {
            return res.status(400).send('Invalid input: data must be an array');
        }

        const result = await dbConnect24(newData);

        
        res.status(200).json({
            message: 'Items Added',
            insertedCount: result.insertedCount, 
            insertedIds: result.insertedIds 
        });
    } catch (err) {
        console.error('Error adding Hotel product:', err);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/Register/User', async (req, res) => {
    try {
        const data = await dbConnect25(); 

        res.send(data);
    } catch (err) {
        console.error('Error fetching Hotel data:', err);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/UserOrders/RestaurantsOrders/:HID', async (req, res) => {
    try {
        const Guestid = req.params.HID; 
        const data = await dbConnect26(Guestid); 

        if (data.length === 0) {
            return res.status(404).send('No hotels found for the given HID');
        }

        res.send(data);
    } catch (err) {
        console.error('Error fetching Hotel data:', err);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/UserOrders/HotelOrders/:HID', async (req, res) => {
    try {
        const Guestid = req.params.HID; 
        const data = await dbConnect27(Guestid); 

        if (data.length === 0) {
            return res.status(404).send('No hotels found for the given HID');
        }

        res.send(data);
    } catch (err) {
        console.error('Error fetching Hotel data:', err);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/UserOrders/GuideOrders/:HID', async (req, res) => {
    try {
        const Guestid = req.params.HID; 
        const data = await dbConnect28(Guestid); 

        if (data.length === 0) {
            return res.status(404).send('No hotels found for the given HID');
        }

        res.send(data);
    } catch (err) {
        console.error('Error fetching Hotel data:', err);
        res.status(500).send('Internal Server Error');
    }
}); 
app.put('/Register/User/:_id', async (req, res) => {
    const id= req.params._id;
    const newData = req.body;

    try {
        const result = await dbConnect29(id, newData);
        
        if (result.matchedCount === 0) {
            return res.status(404).send('Guide not found');
        }

        res.status(200).json({
            message: 'Guide profile updated successfully',
            matchedCount: result.matchedCount,
            modifiedCount: result.modifiedCount
        });
    } catch (err) {
        console.error('Error updating guide profile:', err.message);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/Activities', async (req, res) => {
    try {
        const data = await dbConnect30(); 

        res.send(data);
    } catch (err) {
        console.error('Error fetching Hotel data:', err);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/Activities/:_id', async (req, res) => {
    try {
        const _id = req.params._id; 
        const data = await dbConnect31(_id); 

        if (data.length > 0) {
            res.json(data[0]); 
        } else {
            res.status(404).send('Hotel not found');
        }
    } catch (err) {
        console.error('Error fetching hotel data:', err);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/Activities/HID/:HID', async (req, res) => {
    try {
        const HID = req.params.HID; 
        const data = await dbConnect32(HID); 

        if (data.length === 0) {
            return res.status(404).send('No hotels found for the given HID');
        }

        res.send(data);
    } catch (err) {
        console.error('Error fetching Hotel data:', err);
        res.status(500).send('Internal Server Error');
    }
});
app.post('/ActivitiesOrders', async (req, res) => {
    try {
        const newData = req.body;

        
        if (!Array.isArray(newData)) {
            return res.status(400).send('Invalid input: data must be an array');
        }

        const result = await dbConnect33(newData);

        
        res.status(200).json({
            message: 'Items Added',
            insertedCount: result.insertedCount, 
            insertedIds: result.insertedIds 
        });
    } catch (err) {
        console.error('Error adding Hotel product:', err);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/ActivitiesOrders/:HID', async (req, res) => {
    try {
        const ActHID = req.params.HID; 
        const data = await dbConnect34(ActHID); 

        if (data.length === 0) {
            return res.status(404).send('No hotels found for the given HID');
        }

        res.send(data);
    } catch (err) {
        console.error('Error fetching Hotel data:', err);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/UserOrders/ActivitiesOrders/:HID', async (req, res) => {
    try {
        const Guestid = req.params.HID; 
        const data = await dbConnect35(Guestid); 

        if (data.length === 0) {
            return res.status(404).send('No hotels found for the given HID');
        }

        res.send(data);
    } catch (err) {
        console.error('Error fetching Hotel data:', err);
        res.status(500).send('Internal Server Error');
    }
}); 
app.post('/Activities', async (req, res) => {
    try {
        const newData = req.body;

        console.log(newData);

    
        if (typeof newData !== 'object' || Array.isArray(newData)) {
            return res.status(400).send('Invalid input: data must be a single object');
        }

        const result = await dbConnect36(newData);

        
        res.status(200).json({
            message: 'Hotel added successfully',
            insertedId: result.insertedId 
        });
    } catch (err) {
        console.error('Error adding Hotel:', err);
        res.status(500).send('Internal Server Error');
    }
});
app.delete('/Activities/:_id', async (req, res) => {
    try {
      const _id = decodeURIComponent(req.params._id);
      const result = await dbConnect37(_id); 
      
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Item not found' });
      }
      res.status(200).json({ message: 'Item deleted' });
    } catch (err) {
      console.error('Error deleting item:', err);
      res.status(500).send('Internal Server Error');
    }
  });