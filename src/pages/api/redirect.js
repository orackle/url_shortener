import connectToDatabase from '../../app/utils/mongodb';

export default async function handler(req, res) {
    try {
        const { url } = req.query;
        if (!url) {
            return res.status(400).json({ error: 'URL parameter is missing' });
        }

        const db = await connectToDatabase();
        const foundUrl = await db.collection('url_collection').findOne({ new_url: url });
        if (foundUrl) {
            return res.status(200).json({ original_url: foundUrl.original_url });
        } else {
            return res.status(404).json({ error: 'URL not found' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
