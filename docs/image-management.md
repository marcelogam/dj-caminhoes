# Fotos do estoque

- A capa e a galeria usam o mesmo fluxo de remoção.
- No cadastro, remover uma foto recém-enviada chama `DELETE /api/upload` e só retira a prévia depois do sucesso. Em caso de falha, a foto permanece disponível para tentar novamente.
- Na edição, fotos já salvas são retiradas do formulário e marcadas para exclusão. O arquivo é apagado depois que o cadastro é atualizado com sucesso. Cancelar antes de salvar preserva as imagens do anúncio.
- Durante upload, exclusão ou salvamento, os controles de fotos e o envio do formulário ficam bloqueados.
- Se o cadastro for salvo mas o Blob falhar, o formulário permanece aberto, exibe um aviso e permite repetir a limpeza com **Salvar Alterações**. Fechar o formulário abandona essa tentativa de limpeza; o arquivo poderá permanecer no armazenamento.
- A API exige autenticação de administrador, aceita apenas URLs do Vercel Blob com o prefixo `dj-caminhoes-estoque/` e recusa excluir fotos ainda referenciadas por qualquer caminhão.
- Em produção, a exclusão usa `BLOB_READ_WRITE_TOKEN` no servidor. Em desenvolvimento, uploads locais são removidos da pasta `public/uploads`; URLs do Blob usam o mesmo handler da produção.

## Verificação

`node --import tsx --test tests/image-deletion.test.ts`

Os testes simulam o armazenamento: não enviam nem apagam fotos reais. Eles cobrem remoção imediata/deferida, falhas, validação de URLs e preservação de referências existentes.
