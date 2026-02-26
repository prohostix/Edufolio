import { NextResponse } from 'next/server';

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

let cache = {
    data: null,
    timestamp: 0,
    rating: null,
    total_ratings: null
};

export async function GET() {
    try {
        const apiKey = process.env.GOOGLE_PLACES_API_KEY;
        const placeId = process.env.GOOGLE_PLACE_ID;

        if (!apiKey || !placeId) {
            console.warn('Google Places API Key or Place ID missing in environment variables.');
            return NextResponse.json({
                success: false,
                message: 'Google API functionality disabled',
                reviews: []
            });
        }

        const now = Date.now();
        if (cache.data && (now - cache.timestamp < CACHE_DURATION)) {
            return NextResponse.json({
                success: true,
                source: 'cache',
                reviews: cache.data,
                rating: cache.rating,
                total_ratings: cache.total_ratings
            });
        }

        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&key=${apiKey}`;

        // Use native fetch
        const response = await fetch(url);
        const data = await response.json();

        if (data.status !== 'OK') {
            throw new Error(`Google API Error: ${data.status} - ${data.error_message || ''}`);
        }

        const result = data.result;
        const reviews = result.reviews || [];

        cache = {
            data: reviews,
            timestamp: now,
            rating: result.rating,
            total_ratings: result.user_ratings_total
        };

        return NextResponse.json({
            success: true,
            source: 'api',
            reviews: reviews,
            rating: result.rating,
            total_ratings: result.user_ratings_total
        });

    } catch (error) {
        console.error('Error fetching Google Reviews:', error.message);
        return NextResponse.json({
            success: false,
            message: 'Failed to fetch reviews',
            error: error.message
        }, { status: 500 });
    }
}
