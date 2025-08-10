import express from 'express';
import cors from 'cors';
import { Client } from '@notionhq/client';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Notion API setup
const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Notion Contact API is running' });
});

// Contact form submission endpoint
app.post('/api/contact', async (req, res) => {
  if (!databaseId) {
    return res.status(500).json({ error: 'Notion database ID not set.' });
  }

  const { name, email, subject, message, wechat, selectedMedia, hasAttachment } = req.body;

  try {
    await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        "Name": { title: [{ text: { content: name } }] },
        "Email": { email: email },
        "Subject": { rich_text: [{ text: { content: subject } }] },
        "Message": { rich_text: [{ text: { content: message } }] },
        "WeChat": { rich_text: [{ text: { content: wechat } }] },
        "Selected Media": { rich_text: [{ text: { content: selectedMedia } }] },
        "Has Attachment": { rich_text: [{ text: { content: hasAttachment } }] },
        "Status": { select: { name: "New" } },
        "Date Submitted": { date: { start: new Date().toISOString().split('T')[0] } }
      }
    });
    
    res.status(200).json({ message: 'Form submitted to Notion successfully!' });
  } catch (error) {
    console.error('Notion API error:', error);
    res.status(500).json({ error: 'Failed to submit to Notion.', details: error.message });
  }
});

app.listen(port, () => {
  console.log(`🚀 Notion Contact API server running on port ${port}`);
  console.log(`📝 Contact endpoint: http://localhost:${port}/api/contact`);
  console.log(`❤️  Health check: http://localhost:${port}/api/health`);
});