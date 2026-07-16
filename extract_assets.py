import os
import re
import json
import fitz  # PyMuPDF

def clean_filename(name):
    # Map arabic filenames or specific filenames to clean folder names
    mapping = {
        'bedroom1': 'bedroom-1',
        'bedroom2': 'bedroom-2',
        'library room': 'library-room',
        'home cinema': 'home-cinema',
        'maglis': 'majlis-1',
        'مجلس رجال': 'mens-majlis',
        'واجهة المدينة تعديل تنفيذي': 'city-facade'
    }
    base = os.path.splitext(name)[0].strip()
    key = base.lower()
    if key in mapping:
        return mapping[key]
    # Fallback to alphanumeric with hyphens
    clean = re.sub(r'[^a-zA-Z0-9]', '-', base.lower())
    clean = re.sub(r'-+', '-', clean).strip('-')
    return clean

def get_project_title(name):
    titles = {
        'bedroom-1': {'ar': 'غرفة نوم 1', 'en': 'Bedroom 1'},
        'bedroom-2': {'ar': 'غرفة نوم 2', 'en': 'Bedroom 2'},
        'library-room': {'ar': 'غرفة القراءة / المكتبة', 'en': 'Library Room'},
        'home-cinema': {'ar': 'سينما منزلية', 'en': 'Home Cinema'},
        'majlis-1': {'ar': 'مجلس', 'en': 'Majlis'},
        'mens-majlis': {'ar': 'مجلس رجال', 'en': 'Men\'s Majlis'},
        'city-facade': {'ar': 'واجهة المدينة - تعديل تنفيذي', 'en': 'City Facade - Executive Detail'}
    }
    folder = clean_filename(name)
    return titles.get(folder, {'ar': name, 'en': name})

def extract_pdf_assets(pdf_path, output_dir):
    filename = os.path.basename(pdf_path)
    proj_id = clean_filename(filename)
    proj_dir = os.path.join(output_dir, proj_id)
    os.makedirs(proj_dir, exist_ok=True)
    
    doc = fitz.open(pdf_path)
    num_pages = len(doc)
    print(f"Processing {filename}: {num_pages} pages")
    
    plan_path = None
    render_paths = []
    
    # Page 0 is the plan
    if num_pages > 0:
        page = doc[0]
        # Use matrix for higher DPI zoom (2.0 = 144 DPI)
        pix = page.get_pixmap(matrix=fitz.Matrix(2.0, 2.0))
        plan_filename = f"plan.png"
        full_plan_path = os.path.join(proj_dir, plan_filename)
        pix.save(full_plan_path)
        plan_path = f"/src/assets/projects/{proj_id}/{plan_filename}"
        print(f"  Extracted plan to {plan_filename}")
        
    # Remaining pages are renders
    for i in range(1, num_pages):
        page = doc[i]
        pix = page.get_pixmap(matrix=fitz.Matrix(2.0, 2.0))
        render_filename = f"render_{i}.jpg"
        full_render_path = os.path.join(proj_dir, render_filename)
        # Save as JPEG (quality 90)
        pix.save(full_render_path)
        render_paths.append(f"/src/assets/projects/{proj_id}/{render_filename}")
        print(f"  Extracted render to {render_filename}")
        
    return {
        'id': proj_id,
        'title': get_project_title(filename),
        'plan': plan_path,
        'renders': render_paths,
        'pages_count': num_pages
    }

def decode_rtf_arabic(rtf_path):
    # Simple RTF reader to extract unicode text and plain text
    with open(rtf_path, 'r', encoding='ascii', errors='ignore') as f:
        content = f.read()
    
    # Find all \u1234 characters and match them
    # RTF Unicode escapes look like \u1234? where ? is a placeholder character (like space or character)
    # We find \uXXXX and convert to character
    def replace_unicode(match):
        val = int(match.group(1))
        # If negative, convert to positive 16-bit
        if val < 0:
            val += 65536
        return chr(val)
    
    # Replace \u1234 or \u-1234
    processed = re.sub(r'\\u(-?\d+)[ ]?', replace_unicode, content)
    # Remove RTF control words
    processed = re.sub(r'\\[a-zA-Z0-9*_-]+', '', processed)
    # Remove braces
    processed = processed.replace('{', '').replace('}', '')
    # Normalize whitespaces
    lines = [line.strip() for line in processed.split('\n') if line.strip()]
    return '\n'.join(lines)

def main():
    base_dir = "/Users/mac/Bedaya"
    output_dir = os.path.join(base_dir, "src", "assets", "projects")
    os.makedirs(output_dir, exist_ok=True)
    
    # Process RTF texts
    print("Reading RTF files...")
    tests_rtf_path = os.path.join(base_dir, "Tests.rtf")
    text_content = ""
    if os.path.exists(tests_rtf_path):
        text_content = decode_rtf_arabic(tests_rtf_path)
        print("Tests.rtf Decoded Text Preview:")
        print(text_content[:200])
        
        # Save decoded RTF content in a readable format for reference
        with open(os.path.join(base_dir, "src", "assets", "extracted_text.txt"), "w", encoding="utf-8") as f:
            f.write(text_content)
            
    # Process PDFs
    projects = []
    files = os.listdir(base_dir)
    for file in files:
        if file.lower().endswith('.pdf'):
            pdf_path = os.path.join(base_dir, file)
            proj_data = extract_pdf_assets(pdf_path, output_dir)
            projects.append(proj_data)
            
    # Save projects metadata to JSON
    meta_path = os.path.join(base_dir, "src", "data", "projects.json")
    os.makedirs(os.path.dirname(meta_path), exist_ok=True)
    with open(meta_path, 'w', encoding='utf-8') as f:
        json.dump(projects, f, ensure_ascii=False, indent=2)
    print(f"Saved metadata of {len(projects)} projects to {meta_path}")

if __name__ == "__main__":
    main()
