/**
 * AIO AI Platform Real-Time Content Safety & Automated Moderation Engine
 * PRD Rule: Zero-tolerance automated profanity, harassment & abuse blocker
 * Covers English + Hindi/Hinglish abusive terms, hate speech, and malicious link patterns.
 */

export interface ModerationResult {
  isSafe: boolean;
  flaggedWord?: string;
  reason?: string;
  suggestion?: string;
}

// Curated comprehensive zero-tolerance blacklist (English + common Hindi/Hinglish abusive terms & slurs)
const BLOCKED_TERMS: string[] = [
  // Profanity & Vulgarity
  'fuck', 'fuk', 'fcking', 'fucking', 'fucked', 'fucker', 'motherfucker', 'shit', 'shitty', 'bullshit',
  'bitch', 'bitches', 'bastard', 'asshole', 'dick', 'pussy', 'cunt', 'cock', 'slut', 'whore',
  
  // Hate Speech & Slurs
  'nigger', 'nigga', 'faggot', 'retard', 'kike', 'chink', 'spic', 'tranny', 'dyke',
  
  // Hindi & Hinglish Abusive Terms
  'madarchod', 'behenchod', 'bhenchod', 'bhosdike', 'bhosadike', 'chutiya', 'chutiye',
  'gandu', 'gaandu', 'harami', 'kutta', 'kaminey', 'laude', 'lodu', 'randi', 'saala', 'kamina',
  'chutiyapa', 'bhosda', 'chod', 'gaand', 'jhant',
  
  // Harassment & Threats
  'kill yourself', 'kys', 'die in a fire', 'hope you die', 'rape', 'murder', 'doxx', 'doxxing',
  
  // Malicious / Phishing keywords
  'free-crypto-giveaway', 't.me/claim', 'airdrop-claim.xyz', 'steal-cookies'
];

// Phishing & scam link regex patterns
const SUSPICIOUS_LINK_PATTERNS = [
  /t\.me\/(joinchat|[a-zA-Z0-9_+]+)/i,
  /bit\.ly\/[a-zA-Z0-9_]+/i,
  /tinyurl\.com\/[a-zA-Z0-9_]+/i,
  /javascript:/i,
  /data:text\/html/i,
  /[a-z0-9-]+\.(xyz|top|work|click|link|buzz|monster|rest)\/.*(crypto|airdrop|claim|free|token)/i
];

/**
 * Normalizes text to defeat obfuscation (leetspeak, spaced letters, repeat repeats, symbol masking).
 */
function normalizeForSafety(text: string): { normalized: string; collapsed: string } {
  let s = text.toLowerCase();
  
  // 1. Strip zero-width and invisible unicode characters
  s = s.replace(/[\u200B-\u200D\uFEFF]/g, '');

  // 2. Leetspeak map: @ -> a, $ -> s, 1/!/| -> i, 0 -> o, 3 -> e, 4 -> a, 5 -> s, 7 -> t, 8 -> b
  s = s.replace(/[@]/g, 'a')
       .replace(/[$]/g, 's')
       .replace(/[!|1]/g, 'i')
       .replace(/[0]/g, 'o')
       .replace(/[3]/g, 'e')
       .replace(/[4]/g, 'a')
       .replace(/[5]/g, 's')
       .replace(/[7]/g, 't')
       .replace(/[8]/g, 'b');

  // 3. Remove asterisks, underscores, hyphens, and dots between letters: e.g. f*ck -> fuck, s_h_i_t -> shit
  s = s.replace(/([a-z])[\*_\.\-\+]([a-z])/g, '$1$2');
  s = s.replace(/f\*+ck/gi, 'fuck')
       .replace(/s\*+it/gi, 'shit')
       .replace(/b\*+ch/gi, 'bitch')
       .replace(/ch\*+tiya/gi, 'chutiya');

  // 4. Collapse spaced out single letters: e.g. "f u c k" -> "fuck", "c h u t i y a" -> "chutiya"
  s = s.replace(/\b([a-z](?:\s+[a-z])+)\b/gi, match => match.replace(/\s+/g, ''));
  const noSpaces = s.replace(/[^a-z]/g, '');

  // 5. Version with repeated characters collapsed: e.g. "fuuuuck" -> "fuck"
  const collapsed = s.replace(/([a-z])\1{2,}/g, '$1$1').replace(/([a-z])\1+/g, '$1');

  return { normalized: s, collapsed, noSpaces };
}

/**
 * Validates text content against zero-tolerance community safety policies.
 * Returns true if clean, or false with the exact violation details.
 */
export function validateContentSafety(text: string): ModerationResult {
  if (!text || typeof text !== 'string') {
    return { isSafe: true };
  }

  // Check suspicious URLs first
  for (const pattern of SUSPICIOUS_LINK_PATTERNS) {
    if (pattern.test(text)) {
      return {
        isSafe: false,
        flaggedWord: 'Suspicious Link / Script Scheme',
        reason: 'Unverified shortlinks, script execution schemes, or external crypto/airdrop claims are prohibited.',
        suggestion: 'Please use official, transparent project URLs (e.g. github.com, yourdomain.com).'
      };
    }
  }

  const { normalized, collapsed, noSpaces } = normalizeForSafety(text);

  // Check blocked abusive terms across normalized, character-collapsed, and no-spaces strings
  for (const term of BLOCKED_TERMS) {
    const termClean = term.toLowerCase();
    const regex = new RegExp(`\\b${termClean}\\b`, 'i');
    
    if (
      regex.test(normalized) || 
      regex.test(collapsed) || 
      (termClean.length >= 4 && noSpaces.includes(termClean)) || 
      (termClean.length >= 5 && (normalized.includes(termClean) || collapsed.includes(termClean)))
    ) {
      return {
        isSafe: false,
        flaggedWord: term,
        reason: 'Violation of Community Spaces Zero-Abuse & Professional Conduct Policy.',
        suggestion: 'Please remove disrespectful, profane, or abusive terms before publishing.'
      };
    }
  }

  return { isSafe: true };
}

/**
 * Redacts profane words from text by replacing them with asterisks
 */
export function sanitizeText(text: string): string {
  if (!text) return '';
  let sanitized = text;
  for (const term of BLOCKED_TERMS) {
    const regex = new RegExp(`\\b${term}\\b`, 'gi');
    sanitized = sanitized.replace(regex, '*'.repeat(term.length));
  }
  return sanitized;
}
