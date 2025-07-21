import re

FOOTER_ADDRESS_PATTERN = re.compile(r',[^<]*(?=$|<br>|</p>)', re.IGNORECASE)

def clean_footer_address(text: str) -> str:
    """Remove trailing city/country from footer address lines.

    Examples:
        >>> clean_footer_address('<li>info@example.com, Dubai, UAE</li>')
        '<li>info@example.com</li>'
    """
    return FOOTER_ADDRESS_PATTERN.sub('', text, count=1)

if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1:
        for path in sys.argv[1:]:
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            cleaned = clean_footer_address(content)
            print(cleaned)
    else:
        print(clean_footer_address(sys.stdin.read()))
