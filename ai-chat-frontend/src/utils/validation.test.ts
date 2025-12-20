import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { isValidMessageContent, sanitizeMessageContent } from './validation';

describe('Validation Utils Property Tests', () => {
  /**
   * **Feature: ai-chat-frontend, Property 2: 空消息拒绝**
   * **Validates: Requirements 1.2**
   * 
   * 对于任何仅包含空白字符的字符串，尝试发送应该被拒绝，消息历史保持不变
   */
  it('should reject whitespace-only strings', () => {
    fc.assert(
      fc.property(
        // 生成只包含空白字符的字符串
        fc.stringMatching(/^\s*$/),
        (whitespaceString) => {
          // 空白字符串应该被验证为无效
          expect(isValidMessageContent(whitespaceString)).toBe(false);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should accept non-whitespace strings', () => {
    fc.assert(
      fc.property(
        // 生成包含至少一个非空白字符的字符串
        fc.string().filter(s => s.trim().length > 0),
        (validString) => {
          // 包含非空白字符的字符串应该被验证为有效
          expect(isValidMessageContent(validString)).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should sanitize message content consistently', () => {
    fc.assert(
      fc.property(
        fc.string(),
        (content) => {
          const sanitized = sanitizeMessageContent(content);
          
          // 清理后的内容应该没有前后空白
          expect(sanitized).toBe(sanitized.trim());
          
          // 清理后的内容不应该有连续的空白字符
          expect(sanitized).not.toMatch(/\s{2,}/);
          
          // 如果原内容有效，清理后也应该有效（或为空）
          if (isValidMessageContent(content)) {
            expect(sanitized.length).toBeGreaterThan(0);
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});