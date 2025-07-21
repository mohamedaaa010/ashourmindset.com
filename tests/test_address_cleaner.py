import os
import sys
import pytest

sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from address_cleaner import clean_footer_address


def test_remove_after_comma_before_br():
    inp = '<p>123 Mindset Avenue, Suite 456<br>New York, NY 10001</p>'
    expected = '<p>123 Mindset Avenue<br>New York, NY 10001</p>'
    assert clean_footer_address(inp) == expected


def test_remove_after_comma_before_p_close():
    inp = '<p>Email us at info@example.com, Dubai, UAE</p>'
    expected = '<p>Email us at info@example.com</p>'
    assert clean_footer_address(inp) == expected


def test_remove_city_country_alone():
    text = '<p>Dubai, UAE</p>'
    assert clean_footer_address(text) == '<p>Dubai</p>'
