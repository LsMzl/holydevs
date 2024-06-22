import { NextRequest, NextResponse } from "next/server";


export async function GET (req: NextRequest) {
    // Recher dans l'url
    const searchParams = req.nextUrl.searchParams;
    // ?query=
    const query = searchParams.get('query')
    // Filtre les résultats contenant le paramètre compris dans query
    // ?query=chocolat
    // retourne les résultats comprenant le mot chocolat
    const filteredResults = query 
        ? comments.filter((comment) => comment.text.includes(query))
        : comments;

        return NextResponse.json(filteredResults)
}