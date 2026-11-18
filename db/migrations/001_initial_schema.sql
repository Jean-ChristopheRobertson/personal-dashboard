CREATE TABLE IF NOT EXISTS dashboard_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    item_type TEXT NOT NULL CHECK (item_type IN ('task', 'habit', 'learning')),
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS dashboard_items_type_created_idx
    ON dashboard_items (item_type, created_at DESC);
