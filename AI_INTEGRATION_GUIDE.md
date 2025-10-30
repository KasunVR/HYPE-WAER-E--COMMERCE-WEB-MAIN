# 🤖 AI Integration Guide for Custom Design Studio

## ✅ What's Already Built

Your Custom Design page now has:
- ✅ **Fabric.js Canvas** - Drag, drop, resize, rotate stickers
- ✅ **Multi-sticker upload** - Add unlimited images
- ✅ **T-shirt color customization**
- ✅ **Live preview with realistic mockup**
- ✅ **AI Command Box** - UI ready (disabled by default)
- ✅ **Export design as high-quality image**

## 🚀 When to Add AI (Phase 2)

**Add AI when you:**
- Have 50+ orders/month
- Customers request AI features
- Have $20-50/month budget for APIs

---

## 💰 AI Options & Costs

### Option 1: OpenAI DALL-E 3 (Best Quality)
**Cost:** $0.040 - $0.080 per image
**Pros:** Best quality, reliable
**Cons:** Most expensive

```javascript
// Example API call
const response = await fetch('https://api.openai.com/v1/images/edits', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${OPENAI_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    image: base64Image,
    prompt: aiCommand,
    n: 1,
    size: '1024x1024',
  }),
});
```

### Option 2: Stability AI (Cheapest)
**Cost:** $0.002 per image
**Pros:** Very affordable
**Cons:** Requires more setup

```javascript
const response = await fetch('https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/image-to-image', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${STABILITY_API_KEY}`,
  },
  body: formData,
});
```

### Option 3: Replicate (Good Balance)
**Cost:** ~$0.0023 per image
**Pros:** Easy to use, good models
**Cons:** Sometimes slower

```javascript
const prediction = await replicate.run(
  "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
  {
    input: {
      image: imageUrl,
      prompt: aiCommand,
    }
  }
);
```

---

## 🛠️ How to Integrate AI (Step-by-Step)

### Step 1: Get API Key
1. Sign up at https://platform.openai.com/
2. Go to API Keys
3. Create new secret key
4. Copy and save it

### Step 2: Add Environment Variables
Create `.env` file:
```env
VITE_OPENAI_API_KEY=sk-your-key-here
VITE_AI_ENABLED=true
```

### Step 3: Create AI Service
Create `src/services/aiService.ts`:

```typescript
export const applyAIEffect = async (
  imageDataUrl: string,
  command: string
): Promise<string> => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (!apiKey) {
    throw new Error('OpenAI API key not configured');
  }

  try {
    // Convert data URL to blob
    const response = await fetch(imageDataUrl);
    const blob = await response.blob();
    
    // Create form data
    const formData = new FormData();
    formData.append('image', blob, 'design.png');
    formData.append('prompt', command);
    formData.append('n', '1');
    formData.append('size', '1024x1024');

    // Call OpenAI API
    const aiResponse = await fetch('https://api.openai.com/v1/images/edits', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
      body: formData,
    });

    if (!aiResponse.ok) {
      throw new Error('AI API request failed');
    }

    const data = await aiResponse.json();
    return data.data[0].url;
  } catch (error) {
    console.error('AI Error:', error);
    throw error;
  }
};
```

### Step 4: Update CustomDesign.tsx

Replace the `handleAICommand` function:

```typescript
const handleAICommand = async () => {
  if (!aiCommand.trim() || !fabricCanvas) return;
  
  setIsProcessing(true);
  
  try {
    // Export current canvas as image
    const currentDesign = fabricCanvas.toDataURL({
      format: 'png',
      quality: 1,
    });

    // Call AI service
    const enhancedImageUrl = await applyAIEffect(currentDesign, aiCommand);

    // Load enhanced image back to canvas
    fabric.Image.fromURL(enhancedImageUrl, (img) => {
      img.scale(0.5);
      img.set({
        left: 150,
        top: 200,
      });
      fabricCanvas.add(img);
      fabricCanvas.renderAll();
    });

    alert('✨ AI enhancement applied!');
    setAiCommand('');
  } catch (error) {
    alert('❌ AI processing failed. Please try again.');
    console.error(error);
  } finally {
    setIsProcessing(false);
  }
};
```

---

## 💡 Smart Pricing Strategy

### Free Tier (Current)
- Manual canvas editing
- Upload stickers
- Basic customization
- **Price:** RS 2,999

### Premium AI Tier (Future)
- All free features
- AI enhancements
- Magic effects
- Advanced filters
- **Price:** RS 3,999 (+RS 1,000)

**Implementation:**
```typescript
const basePrice = 2999;
const aiPremium = aiEnabled ? 1000 : 0;
const totalPrice = basePrice + aiPremium;
```

---

## 📊 Cost Calculations

### Using OpenAI DALL-E:
- 100 orders/month with AI = $4-8
- 500 orders/month with AI = $20-40
- 1000 orders/month with AI = $40-80

### Using Stability AI:
- 100 orders/month with AI = $0.20
- 500 orders/month with AI = $1
- 1000 orders/month with AI = $2

**Recommendation:** Start with Stability AI (cheapest)

---

## 🧪 Testing AI Without Costs

Use **mock responses** during development:

```typescript
const handleAICommand = async () => {
  // Mock AI for testing (remove in production)
  if (process.env.NODE_ENV === 'development') {
    setIsProcessing(true);
    setTimeout(() => {
      alert('✨ Mock AI applied: ' + aiCommand);
      setIsProcessing(false);
    }, 2000);
    return;
  }
  
  // Real AI code here...
};
```

---

## 🔒 Security Best Practices

1. **Never expose API keys in frontend**
   - Use backend proxy server
   - Store keys in `.env` (gitignored)

2. **Rate limiting**
   - Limit 5 AI requests per user per day
   - Prevent abuse

3. **Image validation**
   - Check file size (max 5MB)
   - Validate image format
   - Scan for inappropriate content

---

## 📱 Alternative: Use Backend API

**Better approach for production:**

```
Frontend → Your Backend → OpenAI API → Backend → Frontend
```

**Benefits:**
- Hide API keys
- Add rate limiting
- Track usage
- Add analytics

---

## 🎯 Next Steps

1. ✅ **Currently:** Test canvas functionality
2. ⏳ **When ready:** Get OpenAI/Stability API key
3. ⏳ **Implement:** Add AI service file
4. ⏳ **Test:** Use mock responses first
5. ⏳ **Deploy:** Add real API integration
6. ⏳ **Monitor:** Track costs and usage

---

## 📞 Need Help?

**AI API Docs:**
- OpenAI: https://platform.openai.com/docs/guides/images
- Stability AI: https://platform.stability.ai/docs
- Replicate: https://replicate.com/docs

**Issues?**
- Check API key is valid
- Verify image format (PNG/JPG)
- Check network requests in DevTools
- Monitor API usage dashboard

---

**Current Status:** ✅ Phase 1 Complete (Canvas Editor)
**Next:** 🤖 Phase 2 - Add AI when profitable
