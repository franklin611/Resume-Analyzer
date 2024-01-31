import OpenAI from "openai";

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const openai = new OpenAI();

const app = express();
app.use(bodyParser.json());

const OPENAI_API_KEY = ''; // Store this securely!

app.post('/analyze', async (req, res) => {
    const { resumeText, jobDescription } = req.body;

    try {
        const response = await axios.post('https://api.openai.com/v1/engines/davinci/completions', {
            prompt: `${resumeText}\n\n${jobDescription}\n\nAnswer:`,
            max_tokens: 150
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            }
        });

        res.send(response.data.choices[0].text.trim());
    } catch (error) {
        console.error(error);
        res.status(500).send('Error processing request');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
