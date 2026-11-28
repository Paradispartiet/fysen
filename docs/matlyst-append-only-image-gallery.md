# Extending the original 44-image gallery

The existing 44 slots remain in their original order, including their original labels and search links. New approved images are appended to the same manifest. The gallery count and appended cards are derived from it. New thumbnails on discovery surfaces use an exact canonical dish ID and the registered thumbnail, without adding per-dish CSS.

Every added entry must have a unique canonical ID (id = catalogId), label, query, Matlyst surface, separate approved native master and 512px AVIF thumbnail, original PNG and review evidence. The original 44 and any later approved image slots may not be removed, reordered or silently replaced. The existing source-quality tests still apply.

This change adds no images and does not publish or alter database data. It deliberately preserves the current native minimum (1600px in both dimensions); existing 1254px illustration candidates are not promoted as approved native masters.
