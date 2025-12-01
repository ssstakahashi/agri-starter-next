-- Migrate existing image URLs to post_images table
-- Generates a UUID-like string for the ID
INSERT INTO post_images (id, post_id, image_url, created_at)
SELECT 
  lower(hex(randomblob(4))) || '-' || lower(hex(randomblob(2))) || '-4' || substr(lower(hex(randomblob(2))),2) || '-' || substr('89ab',abs(random()) % 4 + 1, 1) || substr(lower(hex(randomblob(2))),2) || '-' || lower(hex(randomblob(6))),
  id,
  image_url,
  created_at
FROM posts
WHERE image_url IS NOT NULL AND image_url != '';
