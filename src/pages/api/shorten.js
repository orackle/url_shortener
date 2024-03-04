import connectToDatabase from '../../app/utils/mongodb';
import random from '../../app/utils/random';

async function shortenUrl(req, res, db) {
    try {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({ error: 'Please provide a URL' });
        }

        if (!/^https?:\/\//i.test(url)) {
            return res.status(400).json({ error: 'Please provide a valid URL' });
        }

        const existingUrl = await db.collection('url_collection').findOne({ original_url: url });

        if (existingUrl) {
            return res.status(200).json({ original_url: existingUrl.original_url, new_url: existingUrl.new_url });
        }

        const newUrl = `${process.env.BASE_URL}/${random(6)}`;
        await db.collection('url_collection').insertOne({ original_url: url, new_url: newUrl });

        return res.status(200).json({ original_url: url, new_url: newUrl });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    } finally {
        // Close the MongoDB connection
        await db.client.close();
    }
}

async function redirectUrl(req, res, db) {
    try {
        const { url } = req.query;
        if (!url) {
            return res.status(400).json({ error: 'URL parameter is missing' });
        }

        const foundUrl = await db.collection('url_collection').findOne({ new_url: url });
        if (foundUrl) {
            return res.redirect(302, foundUrl.original_url);
        } else {
            return res.status(404).json({ error: 'URL not found' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    } finally {
        // Close the MongoDB connection
        await db.client.close();
    }
}

export default async function handler(req, res) {
    try {
        const db = await connectToDatabase();
        if (req.method === 'POST') {
            return await shortenUrl(req, res, db);
        }
        
        return res.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
