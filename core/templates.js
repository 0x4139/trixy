export function ConversationSystemTemplate(conversation) {
    return `The following is a conversation between crypto members of a telegram group:
    ----
    ${conversation}
    ----`
}

export function ExtractionTemplate(){
    return `Please process the provided conversation text and structure the extracted information into a JSON format with the following fields:
            1. **\`sentiment\`**: Specify the overall sentiment of the conversation, selecting from: positive, negative, or neutral.
            2. **\`emotions\`**: List the predominant emotions expressed during the conversation, such as joy, rage, disappointment, etc.
            3. **\`summary\`**: Provide a comprehensive summary of the key points discussed in the conversation.
            4. **\`users\`**: Identify and list all participants involved in the conversation.
            5. **\`topics\`**: Enumerate the main topics covered during the discussion.
            6. **\`impactAssessment\`**: Evaluate if the discussion has the potential to influence market dynamics and explain how if applicable.
            7. **\`impactAssessmentScore\`**: Provide a numerical score from 1 (minimal impact) to 10 (significant impact) to quantify the potential impact of the discussion on relevant areas such as the market or public opinion.
            8. **\`languageStyle\`**: Analyze and describe the language style used in the conversation, including but not limited to formal, informal, technical, or colloquial.
            9. **\`culturalReferences\`**: Identify any cultural references made throughout the conversation, detailing their context and relevance.
            10. **\`marketSentiment\`**: Assess whether the community feels bearish or bullish, with a score from 1 (very bearish) to 10 (very bullish).
            11. **\`emotionTrend\`**: Determine whether the underlying sentiment is predominantly driven by greed or fear, assigning a score from 1 (high fear) to 10 (high greed).
            Ensure that each field in the JSON object is filled accurately based on the content and context of the conversation provided.
    `
}
