import {extractJiraTags} from './utils';

describe('#extractJiraTags()', () => {
  it('returns same title, finds no tags', () => {
    const input = 'Some title';
    const {tags, title} = extractJiraTags(input);
    expect(tags.length).toBe(0);
    expect(title).toBe(input);
  });

  it('finds one tag', () => {
    const input = '[AST-123] Some title';
    const {tags, title} = extractJiraTags(input);
    expect(tags.length).toBe(1);
    expect(tags).toContain('AST-123');
    expect(title).toBe('Some title');
  });

  it('finds two tags, comma separated', () => {
    const input = '[AST-123, SB-456] Some title';
    const {tags, title} = extractJiraTags(input);
    expect(tags.length).toBe(2);
    expect(tags).toContain('AST-123');
    expect(tags).toContain('SB-456');
    expect(title).toBe('Some title');
  });

  it('finds two tags, bracket separated', () => {
    const input = '[AST-123][SB-456] Some title';
    const {tags, title} = extractJiraTags(input);
    expect(tags.length).toBe(2);
    expect(tags).toContain('AST-123');
    expect(tags).toContain('SB-456');
    expect(title).toBe('Some title');
  });

  it('finds two tags, bracket separated', () => {
    const input = '[AST-123] [SB-456] Some title';
    const {tags, title} = extractJiraTags(input);
    expect(tags.length).toBe(2);
    expect(tags).toContain('AST-123');
    expect(tags).toContain('SB-456');
    expect(title).toBe('Some title');
  });

  it('includes stray characters before tags', () => {
    const input = 'a [AST-123] [SB-456] Some title';
    const {tags, title} = extractJiraTags(input);
    expect(tags.length).toBe(2);
    expect(tags).toContain('AST-123');
    expect(tags).toContain('SB-456');
    expect(title).toBe('a Some title');
  });

  it('includes stray characters in between tags', () => {
    const input = '[AST-123] a [SB-456] Some title';
    const {tags, title} = extractJiraTags(input);
    expect(tags.length).toBe(2);
    expect(tags).toContain('AST-123');
    expect(tags).toContain('SB-456');
    expect(title).toBe('a Some title');
  });
});
