import pandas as pd
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet

# مسار ملف Excel
excel_path = r"C:\Users\sameh\Desktop\juice_pos\PERSONAL (version 1).xlsb"

# قراءة البيانات من الشيت الأول
df = pd.read_excel(excel_path, engine='pyxlsb')

# تحويل DataFrame لقائمة من القوائم
data = [df.columns.tolist()] + df.values.tolist()

# إنشاء ملف PDF جديد
pdf_path = r"C:\Users\sameh\Desktop\juice_pos\output.pdf"
pdf = SimpleDocTemplate(pdf_path, pagesize=A4)

styles = getSampleStyleSheet()
elements = []

# إضافة عنوان
elements.append(Paragraph("تقرير من ملف Excel", styles['Title']))
elements.append(Spacer(1, 12))

# إنشاء الجدول
table = Table(data)
table.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, 0), colors.gray),
    ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
    ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
    ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
    ('BOTTOMPADDING', (0, 0), (-1, 0), 10),
    ('GRID', (0, 0), (-1, -1), 0.5, colors.black),
]))

elements.append(table)

# حفظ ملف PDF
pdf.build(elements)

print(f"✅ تم إنشاء الملف بنجاح: {pdf_path}")
