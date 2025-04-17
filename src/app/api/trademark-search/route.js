export async function POST(request) {
  try {
    const body = await request.json();

    const response = await fetch('https://vit-tm-task.api.trademarkia.app/api/v3/us', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return new Response(JSON.stringify({ message: 'Proxy failed' }), {
      status: 500,
    });
  }
}
