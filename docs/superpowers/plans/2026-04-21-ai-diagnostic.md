# AI Diagnostic Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite PsikotesDiagnostic with 10 suggestion bubbles, structured LLM conversation via chatbot-psikotes backend, and specific product recommendations. Delete ChatbotWidget.

**Architecture:** Frontend sends messages to chatbot-psikotes (FastAPI + OpenRouter LLM). Backend returns structured JSON with reply, follow-up bubbles, and product recommendations. System prompt is enhanced with structured output instructions and full product catalog.

**Tech Stack:** Next.js (frontend), FastAPI + OpenRouter/GPT-4o-mini (chatbot backend), Vitest + RTL (tests)

**Repos:**
- Frontend: `/home/deska/Desktop/project-psikotes/fe-psikotes`
- Chatbot: `/home/deska/Desktop/project-psikotes/chatbot-psikotes`

## File Structure

### Chatbot Backend (chatbot-psikotes)
- Modify: `main.py` — add `/diagnostic/chat` endpoint with structured JSON response

### Frontend (fe-psikotes)
- Rewrite: `src/features/psikotes/components/psikotes-diagnostic.tsx`
- Create: `src/features/psikotes/constants/diagnostic-bubbles.constants.ts`
- Delete: `src/features/psikotes/components/chatbot-widget.tsx`
- Modify: `src/features/psikotes/components/index.ts` — remove ChatbotWidget export if present
- Rewrite: `src/tests/component/psikotes-diagnostic.test.tsx`

## Task 1: Backend — Add `/diagnostic/chat` endpoint

**Files:** Modify `chatbot-psikotes/main.py`

- [ ] **Step 1: Create branch in chatbot-psikotes**

```bash
cd /home/deska/Desktop/project-psikotes/chatbot-psikotes
git checkout main && git pull origin main
git checkout -b feature/diagnostic-chat
```

- [ ] **Step 2: Add models and endpoint to main.py**

Add after existing models:

```python
class DiagnosticMessage(BaseModel):
    role: str
    content: str

class DiagnosticContext(BaseModel):
    role: str | None = None
    area: str | None = None
    intensity: str | None = None

class DiagnosticRequest(BaseModel):
    messages: list[DiagnosticMessage]
    context: DiagnosticContext = DiagnosticContext()

class ProductRecommendation(BaseModel):
    id: str
    name: str
    category: str
    priceFrom: int
    href: str

class DiagnosticResponse(BaseModel):
    reply: str
    followUpBubbles: list[str] | None = None
    recommendations: list[ProductRecommendation] | None = None
```

- [ ] **Step 3: Add DIAGNOSTIC_SYSTEM_PROMPT constant**

New system prompt that includes:
- Same empathetic counsellor persona as existing SYSTEM_PROMPT
- Full product catalog with ids, names, categories, prices, hrefs
- Instruction to ALWAYS return valid JSON: `{"reply": "...", "followUpBubbles": [...], "recommendations": [...]}`
- Mandatory question flow: (1) konteks diri, (2) area masalah, (3) cerita bebas
- Optional question triggers based on context
- Product recommendation mapping per topic

- [ ] **Step 4: Add the endpoint**

```python
@app.post("/diagnostic/chat", response_model=DiagnosticResponse)
async def diagnostic_chat(request: DiagnosticRequest):
    if not OPENROUTER_API_KEY:
        raise HTTPException(status_code=500, detail="OPENROUTER_API_KEY not configured")

    messages = [{"role": "system", "content": DIAGNOSTIC_SYSTEM_PROMPT}]
    for msg in request.messages:
        messages.append({"role": msg.role, "content": msg.content})

    if request.context.role or request.context.area:
        ctx = f"User context - role: {request.context.role}, area: {request.context.area}, intensity: {request.context.intensity}"
        messages.append({"role": "system", "content": ctx})

    async with httpx.AsyncClient(timeout=30.0) as client:
        response = await client.post(
            OPENROUTER_URL,
            headers={
                "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                "Content-Type": "application/json",
            },
            json={
                "model": MODEL,
                "messages": messages,
                "max_tokens": 1024,
                "temperature": 0.8,
                "response_format": {"type": "json_object"},
            },
        )

    if response.status_code != 200:
        raise HTTPException(status_code=502, detail="Failed to get response from AI")

    import json
    data = response.json()
    raw = data["choices"][0]["message"]["content"]
    parsed = json.loads(raw)
    return DiagnosticResponse(**parsed)
```

- [ ] **Step 5: Test manually with curl**

```bash
uvicorn main:app --port 8001 --reload
curl -X POST http://localhost:8001/diagnostic/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Aku merasa stres dan kelelahan terus-menerus"}]}'
```

Expected: JSON with `reply`, `followUpBubbles`, optionally `recommendations`.

- [ ] **Step 6: Commit and push**

```bash
git add main.py
git commit -m "feat: add /diagnostic/chat endpoint with structured LLM response"
git push origin feature/diagnostic-chat
```

## Task 2: Frontend — Create bubble constants

**Files:** Create `src/features/psikotes/constants/diagnostic-bubbles.constants.ts`

- [ ] **Step 1: Create the file**

```typescript
export interface DiagnosticBubble {
  id: string
  text: string
  emoji: string
  bgColor: string
  textColor: string
  borderColor: string
}

export const INITIAL_BUBBLES: DiagnosticBubble[] = [
  { id: 'stres', text: 'Stres & kelelahan terus-menerus', emoji: '😮‍💨', bgColor: 'bg-blue-50', textColor: 'text-blue-700', borderColor: 'border-blue-200' },
  { id: 'karir', text: 'Bingung soal karir & masa depan', emoji: '🧭', bgColor: 'bg-green-50', textColor: 'text-green-700', borderColor: 'border-green-200' },
  { id: 'hubungan', text: 'Hubungan tidak baik-baik saja', emoji: '💔', bgColor: 'bg-purple-50', textColor: 'text-purple-700', borderColor: 'border-purple-200' },
  { id: 'percaya-diri', text: 'Tidak percaya diri & rendah diri', emoji: '🪞', bgColor: 'bg-orange-50', textColor: 'text-orange-700', borderColor: 'border-orange-200' },
  { id: 'kepribadian', text: 'Ingin tahu kepribadian & potensi diri', emoji: '🧠', bgColor: 'bg-teal-50', textColor: 'text-teal-700', borderColor: 'border-teal-200' },
  { id: 'nikah', text: 'Mempertimbangkan pernikahan', emoji: '💍', bgColor: 'bg-yellow-50', textColor: 'text-yellow-700', borderColor: 'border-yellow-200' },
  { id: 'tim', text: 'Rekrut atau kembangkan tim', emoji: '🏢', bgColor: 'bg-slate-50', textColor: 'text-slate-700', borderColor: 'border-slate-200' },
  { id: 'terjebak', text: 'Terjebak & tidak tahu harus mulai dari mana', emoji: '🌀', bgColor: 'bg-pink-50', textColor: 'text-pink-700', borderColor: 'border-pink-200' },
  { id: 'cpns', text: 'Persiapkan tes CPNS / BUMN / MT', emoji: '📋', bgColor: 'bg-indigo-50', textColor: 'text-indigo-700', borderColor: 'border-indigo-200' },
  { id: 'mental', text: 'Pahami kondisi mentalku lebih dalam', emoji: '🔍', bgColor: 'bg-violet-50', textColor: 'text-violet-700', borderColor: 'border-violet-200' },
]
```

- [ ] **Step 2: Commit**

```bash
git add src/features/psikotes/constants/diagnostic-bubbles.constants.ts
git commit -m "feat: add diagnostic bubble suggestion constants"
```

## Task 3: Frontend — Delete ChatbotWidget

**Files:**
- Delete: `src/features/psikotes/components/chatbot-widget.tsx`
- Modify: `src/features/psikotes/components/index.ts`

- [ ] **Step 1: Search for all ChatbotWidget references**

```bash
grep -rn "ChatbotWidget\|chatbot-widget" src/ --include="*.tsx" --include="*.ts"
```

- [ ] **Step 2: Delete the file and remove any exports/imports**

```bash
rm src/features/psikotes/components/chatbot-widget.tsx
```

Remove any ChatbotWidget export from `index.ts` and any usage in layout/page files.

- [ ] **Step 3: Verify build**

```bash
npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: remove ChatbotWidget component"
```

## Task 4: Frontend — Rewrite PsikotesDiagnostic

**Files:** Rewrite `src/features/psikotes/components/psikotes-diagnostic.tsx`

- [ ] **Step 1: Rewrite the component**

New component with 3 states: `initial`, `chatting`, `result`.

Types:
```typescript
type Phase = 'initial' | 'chatting' | 'result'

interface Message { role: 'user' | 'assistant'; content: string }

interface ProductRecommendation {
  id: string; name: string; category: string; priceFrom: number; href: string
}

interface DiagnosticResponse {
  reply: string
  followUpBubbles?: string[]
  recommendations?: ProductRecommendation[]
}
```

Key behaviors:
- `initial`: show 10 INITIAL_BUBBLES + textarea. Click bubble = send as first message.
- `chatting`: show message history, follow-up bubbles from API, textarea for free input.
- `result`: show product cards with name, category, price, "Lihat →" link. Input still active.
- API call to `NEXT_PUBLIC_CHATBOT_URL/diagnostic/chat` with messages + context.
- Loading spinner while waiting for API.
- "Mulai dari awal" reset button.

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Test in browser**

Verify: bubbles visible, click sends message, AI responds, follow-up bubbles appear, recommendations show with links, reset works.

- [ ] **Step 4: Commit**

```bash
git add src/features/psikotes/components/psikotes-diagnostic.tsx
git commit -m "feat: rewrite PsikotesDiagnostic with bubbles and API integration"
```

## Task 5: Frontend — Rewrite tests

**Files:** Rewrite `src/tests/component/psikotes-diagnostic.test.tsx`

- [ ] **Step 1: Write tests**

Mock `global.fetch` to return structured responses. Tests:
1. Renders all 10 bubble suggestions in initial state
2. Renders free text input in initial state
3. Clicking a bubble shows it as user message in chat
4. Shows loading indicator while waiting for API
5. Displays AI reply after API response
6. Shows follow-up bubbles from API response
7. Clicking follow-up bubble sends it as next message
8. Shows product recommendation cards when API returns them
9. Each recommendation card has correct href link
10. Reset button returns to initial state with bubbles
11. Free text submit works (type + click send)
12. Enter submits, Shift+Enter does not
13. Textarea disabled during loading

- [ ] **Step 2: Run tests**

```bash
npx vitest run src/tests/component/psikotes-diagnostic.test.tsx
```

- [ ] **Step 3: Run full suite + lint**

```bash
npx vitest run
npx eslint . --ext .ts,.tsx --max-warnings 0
```

- [ ] **Step 4: Commit**

```bash
git add src/tests/component/psikotes-diagnostic.test.tsx
git commit -m "test: rewrite PsikotesDiagnostic tests for bubble + API flow"
```

## Task 6: Final verification and push

- [ ] **Step 1: Full build check**

```bash
npx tsc --noEmit
npm run build
npx vitest run
npx eslint . --ext .ts,.tsx --max-warnings 0
```

All must pass with zero errors.

- [ ] **Step 2: Push frontend to all branches**

```bash
git push origin production
git checkout testing && git merge production && git push origin testing
git checkout development && git merge production && git push origin development
git checkout production
```
