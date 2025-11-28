import pdfplumber
import csv

pdf_path = "/mnt/data/34c451e3-e1ed-4d3f-a104-cedf7f012f5c.png"

with pdfplumber.open(pdf_path) as pdf:
    all_text = []
    for page in pdf.pages:
        all_text.extend(page.extract_text().split('\n'))

# حفظ النتائج كـ CSV
with open("output.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    for line in all_text:
        writer.writerow([line])
