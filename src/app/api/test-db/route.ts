import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    return NextResponse.json({
      step: "env-check",
      ok: false,
      error: "MONGODB_URI is missing",
    });
  }

  try {
    const client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 10000,
    });
    await client.connect();
    await client.db("bazardor").command({ ping: 1 });
    await client.close();

    return NextResponse.json({
      step: "mongo-connect",
      ok: true,
      message: "MongoDB connected successfully ✅",
      uriLength: uri.length,
    });
  } catch (err: any) {
    return NextResponse.json({
      step: "mongo-connect",
      ok: false,
      errorName: err.name,
      errorMessage: err.message,
      errorCode: err.code,
      uriLength: uri.length,
      uriFull: uri, 
    });
  }
}