import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
 
dotenv.config();
 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
 
const app = express();
app.use(express.json());
 
const publicPath = path.resolve(__dirname, 'public', 'browser');
app.use(express.static(publicPath));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(publicPath, 'index.html'));
});

const FOUNDRY_BASE = process.env.FOUNDRY_BASE;
const API_KEY = process.env.FOUNDRY_API_KEY;

if (!FOUNDRY_BASE || !API_KEY) {
  console.error('Missing required environment variables. Please set FOUNDRY_BASE and FOUNDRY_API_KEY.');
  process.exit(1);
}

const axiosInstance = axios.create({
  timeout: 10000
});
 
app.post('/api/ai/responses', async (req, res) => {
  try {
    const forward = {
      input: req.body.input || req.body.messages,
      model: req.body.model || 'gpt-5-mini',
      max_output_tokens: req.body.max_output_tokens ?? 500
    };
    const r = await axiosInstance.post(
      `${FOUNDRY_BASE}/openai/responses?api-version=2025-04-01-preview`,
      forward,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        }
      }
    );
    res.status(r.status).json(r.data);
  } catch (err) {
    const axiosErr = err;
    if (axiosErr?.response) {
      console.error('proxy error (response)', axiosErr.response.status, axiosErr.response.data);
      res.status(axiosErr.response.status).json({ error: 'proxy error', details: axiosErr.response.data });
    } else if (axiosErr?.request) {
      console.error('proxy error (no response)', axiosErr.message);
      res.status(502).json({ error: 'proxy error', details: 'No response from upstream service' });
    } else {
      console.error('proxy error', axiosErr.message);
      res.status(500).json({ error: 'proxy error', details: axiosErr.message });
    }
  }
});

app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/api/')) {
    res.sendFile(path.resolve(publicPath, 'index.html'));
  } else {
    next();
  }
});

app.listen(process.env.PORT || 3000, () => console.log('Proxy listening on 3000'));
