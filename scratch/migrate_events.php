<?php
$conn = new mysqli('localhost', 'root', '', 'imsdb');
if ($conn->connect_error) die("Connection failed: " . $conn->connect_error);

// 1. Add slug column if it doesn't exist
$check = $conn->query("SHOW COLUMNS FROM events LIKE 'slug'");
if ($check->num_rows == 0) {
    $conn->query("ALTER TABLE events ADD COLUMN slug VARCHAR(255) AFTER title");
    echo "Column 'slug' added to 'events' table.\n";
} else {
    echo "Column 'slug' already exists.\n";
}

// 2. Populate slugs for existing events
$res = $conn->query("SELECT id, title FROM events WHERE slug IS NULL OR slug = ''");
while ($row = $res->fetch_assoc()) {
    $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $row['title'])));
    $conn->query("UPDATE events SET slug = '$slug' WHERE id = " . $row['id']);
    echo "Updated event ID {$row['id']} with slug: $slug\n";
}

$conn->close();
?>
