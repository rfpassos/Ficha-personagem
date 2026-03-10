#!/usr/bin/env python3
"""
Database Query Runner - Executes SELECT queries on the local PostgreSQL database.
Usage: python scripts/query_runner.py "SELECT * FROM table_name"
"""

import sys
import os
import json

try:
    import psycopg2
    from psycopg2.extras import RealDictCursor
except ImportError:
    print("Error: psycopg2 not installed. Run: pip install psycopg2-binary")
    sys.exit(1)

def get_db_connection():
    """Create database connection from environment variables."""
    return psycopg2.connect(
        host=os.getenv("DB_HOST", "localhost"),
        port=os.getenv("DB_PORT", "5432"),
        database=os.getenv("DB_NAME", "postgres"),
        user=os.getenv("DB_USER", "postgres"),
        password=os.getenv("DB_PASSWORD", "postgres")
    )

def execute_query(sql: str):
    """Execute a SELECT query and return results."""
    # Security: Only allow SELECT statements
    normalized = sql.strip().upper()
    if not normalized.startswith("SELECT"):
        print("Error: Only SELECT statements are allowed for safety.")
        sys.exit(1)
    
    conn = get_db_connection()
    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(sql)
            rows = cur.fetchall()
            return rows
    finally:
        conn.close()

def format_as_markdown_table(rows):
    """Format query results as a Markdown table."""
    if not rows:
        return "No results found."
    
    headers = list(rows[0].keys())
    
    # Header row
    header_line = "| " + " | ".join(headers) + " |"
    separator = "| " + " | ".join(["---"] * len(headers)) + " |"
    
    # Data rows
    data_lines = []
    for row in rows:
        values = [str(row.get(h, "")) for h in headers]
        data_lines.append("| " + " | ".join(values) + " |")
    
    return "\n".join([header_line, separator] + data_lines)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python scripts/query_runner.py \"SELECT * FROM table_name\"")
        sys.exit(1)
    
    query = sys.argv[1]
    
    try:
        results = execute_query(query)
        print(format_as_markdown_table(results))
    except Exception as e:
        print(f"Error executing query: {e}")
        sys.exit(1)
