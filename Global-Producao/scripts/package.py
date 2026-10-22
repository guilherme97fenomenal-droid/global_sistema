from pathlib import Path
import zipfile,shutil
r=Path(__file__).resolve().parent.parent
files=[p for p in r.rglob('*') if p.is_file() and not any(v in p.relative_to(r).parts for v in ['node_modules','data','.git','dist','public']) and p.suffix!='.zip']
with zipfile.ZipFile(r/'public/source.zip','w',zipfile.ZIP_DEFLATED) as z:
 for p in files:z.write(p,'Global-Producao/'+str(p.relative_to(r)))
shutil.copy(r/'docs/CONTINUIDADE.md',r/'public/project-status.md')
