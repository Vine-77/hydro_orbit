# Hydro-Orbit API Documentation

## Rate Limiting

The Hydro-Orbit API implements rate limiting to ensure fair usage and protect against abuse.

### Configuration

- **Window**: 15 minutes (900 seconds)
- **Max Requests**: 100 requests per window per IP address

### Rate Limit Headers

Each response includes the following headers:

| Header | Description |
|--------|-------------|
| `X-RateLimit-Limit` | Maximum number of requests allowed in the window |
| `X-RateLimit-Remaining` | Number of requests remaining in the current window |
| `X-RateLimit-Reset` | Unix timestamp when the rate limit resets |

### Handling Rate Limit Errors

When you exceed the rate limit, you'll receive a `429 Too Many Requests` response:

```json
{
  "message": "Too many requests, please try again later."
}
```

### Best Practices

1. **Cache responses**: Implement caching to reduce API calls
2. **Batch requests**: Combine multiple operations when possible
3. **Handle 429 gracefully**: Implement exponential backoff
4. **Monitor usage**: Track your API usage to stay within limits

### Endpoints and Expected Usage

| Endpoint | Recommended Calls |
|----------|-------------------|
| `/api/auth/*` | 10/minute |
| `/api/farms` | 30/minute |
| `/api/sensors` | 60/minute |
| `/api/irrigation` | 30/minute |
| `/api/alerts` | 20/minute |
| `/api/history` | 30/minute |

### Custom Rate Limiting

For enterprise customers requiring higher limits, contact support to discuss custom rate limiting configurations.
