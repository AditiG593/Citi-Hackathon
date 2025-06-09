from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import router

# Create FastAPI application
app = FastAPI(
    title="Debt Snowball/Avalanche API",
    description="API for debt repayment calculation and tracking",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json"
)

# Add CORS middleware to allow frontend to access the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development; restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include our API routes
app.include_router(router, prefix="/api", tags=["debts"])

@app.get("/", tags=["health"])
async def read_root():
    """
    Health check endpoint.
    """
    return {"status": "healthy", "message": "Debt Snowball/Avalanche API is running"}
