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
  'fuck', 'fucking', 'fucked', 'fucker', 'motherfucker', 'shit', 'shitty', 'bullshit',
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
  /[a-z0-9-]+\.(xyz|top|work|click|link|buzz|monster|rest)\/.*(crypto|airdrop|claim|free|token)/i
];

/**
 * Validates text content against zero-tolerance community safety policies.
 * Returns true if clean, or false with the exact violation details.
 */
export function validateContentSafety(text: string): ModerationResult {
  if (!text || typeof text !== 'string') {
    return { isSafe: true };
  }

  const normalized = text.toLowerCase()
    .replace(/[0-9]/g, match => {
      // Common leetspeak substitutes: 0 -> o, 1 -> i/l, 3 -> e, 4 -> a, 5 -> s, 8 -> b
      const map: Record<string, string> = { '0': 'o', '1': 'i', '3': 'e', '4': 'a', '5': 's', '8': 'b', '$': 's', '@': 'a' };
      return map[match] || match;
    })
    .replace(/[^a-z\s]/g, ' '); // Strip punctuation to catch spaced/masked words

  // 1. Check for blocked abusive terms
  for (const term of BLOCKED_TERMS) {
    // Check whole word match or substring for longer slurs
    const regex = new RegExp(`\\b${term}\\b`, 'i');
    if (regex.test(normalized) || (term.length >= 6 && normalized.includes(term))) {
      return {
        isSafe: false,
        flaggedWord: term,
        reason: 'Violation of Community Spaces Zero-Abuse & Professional Conduct Policy.',
        suggestion: 'Please remove disrespectful or abusive terms before publishing.'
      };
    }
  }

  // 2. Check for suspicious phishing or scam link patterns
  for (const pattern of SUSPICIOUS_LINK_PATTERNS) {
    if (pattern.test(text)) {
      return {
        isSafe: false,
        flaggedWord: 'Suspicious Link',
        reason: 'Unverified shortlinks or external crypto/airdrop claims are prohibited.',
        suggestion: 'Please use official, transparent project URLs (e.g. github.com, yourdomain.com).'
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
