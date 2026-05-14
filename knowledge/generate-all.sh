#!/bin/bash
# generate-all.sh — Run all content JSON files through the page generator
# Usage: bash generate-all.sh
# Run from the /knowledge directory

NODE=/usr/local/bin/node
GENERATOR="generate.js"
CONTENT_DIR="content"
COUNT=0
ERRORS=0

echo "🚀 DataLakehouse101 Knowledge Base Generator"
echo "============================================"

for json in "$CONTENT_DIR"/*.json; do
  slug=$(basename "$json" .json)
  echo -n "  → $slug ... "
  if $NODE "$GENERATOR" "$json" 2>/dev/null; then
    COUNT=$((COUNT + 1))
  else
    echo "ERROR"
    ERRORS=$((ERRORS + 1))
  fi
done

echo ""
echo "============================================"
echo "✅ Generated: $COUNT pages"
if [ $ERRORS -gt 0 ]; then
  echo "❌ Errors:    $ERRORS pages"
fi
