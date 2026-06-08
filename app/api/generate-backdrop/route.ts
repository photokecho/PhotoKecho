import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      backdropBase, archCount, archStyle, archColour,
      drapeStyle, drapeColour, floralPlacement, floralType,
      floralColour, lighting, extras, occasion,
    } = body

    const archDesc = archCount === 'no arch'
      ? 'no arch frame'
      : `${archCount} ${archColour} ${archStyle} arch frames`

    const drapeDesc = drapeStyle === 'no draping'
      ? 'no fabric draping'
      : `${drapeColour} coloured fabric in a ${drapeStyle} arrangement`

    const floralDesc = floralPlacement === 'no flowers'
      ? 'no floral decoration'
      : `${floralColour} ${floralType} in a ${floralPlacement} arrangement`

    const lightingDesc = lighting === 'no lighting' ? '' : ` Lighting: ${lighting}.`
    const extrasDesc = extras?.length > 0 ? ` Props: ${extras.join(', ')}.` : ''

    const prompt = `A professional photorealistic photo booth backdrop for a South Asian ${occasion}. Backdrop: ${backdropBase} fabric. Arch: ${archDesc}. Draping: ${drapeDesc}. Florals: ${floralDesc}.${lightingDesc}${extrasDesc} Luxury South Asian wedding decor, soft professional studio lighting, full backdrop visible, no people, shot straight-on, photorealistic, high quality, rich colours and textures.`

    // Try gpt-image-1 first (newer, available to all paid accounts), fall back to dall-e-3
    let imageUrl: string | null = null
    let lastError = ''

    for (const model of ['gpt-image-1', 'dall-e-3', 'dall-e-2']) {
      const reqBody: Record<string, unknown> = { model, prompt, n: 1, size: '1024x1024' }
      if (model === 'dall-e-3') reqBody.quality = 'standard'

      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify(reqBody),
      })

      if (response.ok) {
        const data = await response.json()
        // gpt-image-1 returns base64, dall-e returns url
        if (data?.data?.[0]?.url) { imageUrl = data.data[0].url; break }
        if (data?.data?.[0]?.b64_json) {
          imageUrl = `data:image/png;base64,${data.data[0].b64_json}`; break
        }
      } else {
        const err = await response.json()
        lastError = err.error?.message || 'Failed'
        // Only try next model if this one doesn't exist
        if (!lastError.includes('does not exist') && !lastError.includes('not exist')) break
      }
    }

    if (imageUrl) return NextResponse.json({ imageUrl })
    return NextResponse.json({ error: lastError || 'Generation failed' }, { status: 500 })

  } catch (err) {
    console.error('Edge error:', err)
    return NextResponse.json({ error: 'Server error — please try again.' }, { status: 500 })
  }
}
